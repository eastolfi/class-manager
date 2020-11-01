import { Injectable } from "@angular/core";

import { IExam } from "../components/exam-builder/exam-builder.component";
import { Document, AlignmentType, HeadingLevel, Paragraph, TextRun, UnderlineType } from 'docx';
import { Subject } from 'rxjs';
import { DomService } from './dom.service';

const studentInfoSize = 60;
const fullPageSize = 150;
const SPACE = " ";

@Injectable({
    providedIn: "root"
})
export class ExamGeneratorService {
    constructor(private readonly domService: DomService) { }

    public downloadExam({ questions, documentName }: IExam): Subject<{ done: boolean, message: string }> {
        const result$ = new Subject<{ done: boolean, message: string }>();

        Promise.all([
            this.domService.downloadWordFile(`${documentName}.docx`, this.generateExam(questions, false)),
            this.domService.downloadWordFile(`${documentName}:solved.docx`, this.generateExam(questions, true))
        ])
        .then(() => {
            result$.next({ done: true, message: "Examen generado" });
        })
        .catch(error => {
            result$.error({ done: false, message: error.message });
        })
        .finally(() => {
            result$.complete();
        });

        return result$;
    }

    private generateExam(questions, withSolution): Document {
        let sectionChildrens = []

        questions.forEach((question, index) => this.generateQuestion(sectionChildrens, question, index, withSolution));

        let doc = new Document()
        doc.addSection({
            children: [
                this.generateHeadingLine("Apellido : "),
                this.generateHeadingLine("Nombre :  "),
                this.generateHeadingLine("Clase :      "),
                this.generateHeadingLine("Fecha :     "),
                new Paragraph({
                    text: "Prototipo Examen Español",
                    alignment: AlignmentType.CENTER,
                    heading: HeadingLevel.HEADING_1
                }),
                ...sectionChildrens
            ]
        })
        return doc;
    }

    private generateQuestionTitle(question, questionNumber): Paragraph {
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

    private generateHeadingLine(label): Paragraph {
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

    private generateQuestion(sectionChildrens, question, index, withSolution): void {
        sectionChildrens.push(this.generateQuestionTitle(question, index + 1))

        const { answer } = question;
        if (answer.type === 1) {
            this.generateAnswerSingleLine(sectionChildrens, answer, withSolution);
        } else if (answer.type === 2) {
            this.generateAnswerMultiChoice(sectionChildrens, answer, withSolution);
        } else if (answer.type === 3) {
            this.generateAnswerMultiLine(sectionChildrens, answer, withSolution);
        }
    }

    private generateAnswerSingleLine(sectionChildrens, answer, withSolution): void {
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
    private generateAnswerMultiLine(sectionChildrens, answer, withSolution): void {
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
    private generateAnswerMultiChoice(sectionChildrens, answer, withSolution): void {
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






        // const downloader: HTMLAnchorElement = document.createElement('a');
        // // downloader.setAttribute('hidden', 'true');
        // downloader.hidden = true;
        // downloader.href = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL,
        //     this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob)));
        // downloader.download = 'pruebas.txt';

        // window.document.body.append(downloader);

        // // downloader.onclick =
        // downloader.click();
}
