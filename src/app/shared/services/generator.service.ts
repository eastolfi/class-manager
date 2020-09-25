import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { IExam } from "../components/exam-builder/exam-builder.component";
import { IQuestion, Question } from "../components/question-builder/question-builder.component";
import { IAnswer, AnswerMultiple } from "../models";

@Injectable({
	providedIn: "root"
})
export class ExamGeneratorService {
	constructor(private http: HttpClient) {}

	generateExam(exam: IExam) {
		exam.questions.map((question: IQuestion) => {
			if (question.answer instanceof AnswerMultiple && question.answer.content.size) {
				question.answer.contentAsList = Array.from(question.answer.content as Set<IAnswer>)
			}
		})


		return this.http.post("http://localhost:3333/generate", exam)
		// return this.http.get("http://localhost:3333")
	}
}
