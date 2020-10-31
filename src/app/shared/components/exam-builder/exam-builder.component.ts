import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

import { IQuestion, Question, QuestionBuilderComponent } from "../question-builder/question-builder.component";
import { ExamGeneratorService } from "../../services/generator.service";
import { AlertService } from '../../components/alert';
import { ExamBuilderMapper } from './exam-builder.mapper';
import { QuestionFactory } from '@app/shared/factories/question.factory';
import { ExamFactory } from '@app/shared/factories/exam.factory';
// import { IAnswer, AnswerMultiple } from "../../models";

export declare interface IExam {
	documentName: string,
	questions: IQuestion[]
}

@Component({
	selector: "cm-exam-builder",
	templateUrl: "./exam-builder.component.html",
	styleUrls: ["./exam-builder.component.scss"]
})
export class ExamBuilderComponent {
	public form: FormGroup
	// public questions: Array<IQuestion> = [];

	constructor(
        private readonly examFactory: ExamFactory,
        private readonly questionFactory: QuestionFactory,
        private generator: ExamGeneratorService,
        private alertService: AlertService
    ) {
		this.initForm();
	}

    public get questions(): FormArray {
        return this.form.get('questions') as FormArray
    }

	public addQuestion() {
        this.questions.push(this.questionFactory.createQuestionForm())
	}

	public generateExam(): void {
		this.generator.generateExam(this.form.value).subscribe((result: { done: boolean, message: string }) => {
			if (result.done) {
				this.alertService.showSuccess(result.message)
			} else {
				this.alertService.showError(result.message)
			}
		})
	}

	private initForm(): void {
		if (!this.form) {
            this.form = this.examFactory.createExamForm();
        }
	}
}
