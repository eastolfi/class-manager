const express = require("express")
const bodyParser = require("body-parser")
const http = require("http")
const cors = require("cors")
const path = require("path")
const fs = require("fs")
const { TextRun, Paragraph, Document, Packer, HeadingLevel, AlignmentType, UnderlineType } = require("docx")

const studentInfoSize = 60
const fullPageSize = 150;
const SPACE = " "

function generateQuestionTitle(question, questionNumber) {
	let children = [
		new TextRun({
			text: `${questionNumber}) ${question.title.title}`
		}),
	]
	if (question.title.showScore) {
		children.push(new TextRun({
			text: `    ${question.title.score} puntos`,
			size: 20,
			italics: true
		}))
	}

	return new Paragraph({
		heading: HeadingLevel.HEADING_2,
		children
	})
}

function generateHeadingLine(label) {
	return new Paragraph({
		alignment: AlignmentType.LEFT,
		children: [
			new TextRun({
				text: label
			}),
			new TextRun({
				text: SPACE.repeat(studentInfoSize),
				underline: {
					type: UnderlineType.SINGLE,
					color: "990011"
				}
			})
		]
	})
}

function generateQuestion(sectionChildrens, question, index, withSolution) {
    sectionChildrens.push(generateQuestionTitle(question, index + 1))

    const { answer } = question;
    if (answer.type === 1) {
        generateAnswerSingleLine(sectionChildrens, answer, withSolution);
    } else if (answer.type === 2) {
        generateAnswerMultiChoice(sectionChildrens, answer, withSolution);
    } else if (answer.type === 3) {
        generateAnswerMultiLine(sectionChildrens, answer, withSolution);
    }
}

function generateAnswerSingleLine(sectionChildrens, answer, withSolution) {
    const { content } = answer;
    const contentLength = withSolution ? fullPageSize - content.length : fullPageSize;
    const responseContent = (withSolution ? content : '') + SPACE.repeat(contentLength);
    sectionChildrens.push(new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
            new TextRun({
                text: responseContent,
                underline: {
                    type: UnderlineType.SINGLE,
                    color: "990011"
                }
            })
        ]
    }))
}
function generateAnswerMultiLine(sectionChildrens, answer, withSolution) {
    const { content } = answer;
    const contentLength = withSolution ? fullPageSize - content.length : fullPageSize;
    const responseContent = (withSolution ? content : '') + SPACE.repeat(contentLength);
    sectionChildrens.push(new Paragraph({
        alignment: AlignmentType.LEFT,
        children: [
            new TextRun({
                text: responseContent,
                underline: {
                    type: UnderlineType.SINGLE,
                    color: "990011"
                }
            })
        ]
    }))
}
function generateAnswerMultiChoice(sectionChildrens, answer, withSolution) {
    answer.choices.forEach((choice, i) => {
        sectionChildrens.push(new Paragraph({
            children: [
                new TextRun({
                    text: choice.content,
                    bold: withSolution,
                })
            ],
            bullet: {
                level: 0
            }
        }))
    })
}

function generateExam(questions, withSolution) {
    let sectionChildrens = []

    questions.forEach((question, index) => generateQuestion(sectionChildrens, question, index, withSolution));

    let doc = new Document()
    doc.addSection({
        children: [
            generateHeadingLine("Apellido : "),
            generateHeadingLine("Nombre :  "),
            generateHeadingLine("Clase :      "),
            generateHeadingLine("Fecha :     "),
            new Paragraph({
                text: "Prototipo Examen Español",
                alignment: AlignmentType.CENTER,
                heading: HeadingLevel.HEADING_1
            }),
            ...sectionChildrens
        ]
    })
    return doc
}

const app = express()

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get("/", (req, res) => {
	res.send("Holi")
})

const mockedExam = JSON.parse(`{"documentName":"pruebas","questions":[{"title":{"title":"Pregunta 1","showScore":true,"score":1},"answerType":1,"score":{"calculationType":0,"totalScore":1,"scorePerAnswer":1,"totalAnswers":1},"answer":{"id":1601140318471,"type":1,"content":"Respuesta"}},{"title":{"title":"Pregunta 2","showScore":true,"score":1},"answerType":2,"score":{"calculationType":1,"totalScore":1,"scorePerAnswer":0.5,"totalAnswers":2},"answer":{"id":1601140337457,"type":2,"choices":[{"content":"Opción A"},{"content":"Opción B"}]}}]}`)

function writeDocument(documentName, doc) {
    return new Promise((resolve, reject) => {
        Packer.toBuffer(doc).then(buffer => {
            try {
                fs.writeFileSync(documentName, buffer)
                console.log(`Exam generated -> ${path.resolve(__dirname, `./${documentName}`)}`)

                resolve();
            } catch (err) {
                // let error = new Error(err)
                let message = err.message

                if (err.code === 'EBUSY') {
                    // error.message = `Recurso "${err.path}" ocupado. Ciérrelo et intente de nuevo.`
                    message = `El documento "${err.path}" ocupado. Ciérrelo et intente de nuevo.`
                    // console.log(error);

                }

                reject(new Error(message));
            }
        })
    });
}

app.post("/generate", (req, res) => {
    const { questions, documentName } = mockedExam//req.body

    Promise.all([
        writeDocument(`${documentName}.docx`, generateExam(questions, false)),
        writeDocument(`${documentName}:solved.docx`, generateExam(questions, true))
    ])
	.then(() => {
        res.send({ done: true, message: "Examen generado" })
	})
    .catch(error => {
        res.send({ done: false, message: error.message });
    });

})

const server = http.createServer(app)
server.listen(3333, () => {
	console.log("Server started in port 3333")
})
