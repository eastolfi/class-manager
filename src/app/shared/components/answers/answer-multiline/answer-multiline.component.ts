import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnswerFactory } from '@app/shared/factories/answer.factory';
import { AnswerType } from '@app/shared/models';

@Component({
	selector: "exagen-answer-multiline",
	templateUrl: "./answer-multiline.component.html",
	styleUrls: ["./answer-multiline.component.scss"]
})
export class AnswerMultilineComponent implements OnInit {
	@Input()
	public form: FormGroup

	constructor(private readonly answerFactory: AnswerFactory) { }

	ngOnInit() {
		this.initForm();
	}

	private initForm(): void {
		if (!this.form) {
			this.form = this.answerFactory.createAnswerForm(AnswerType.MULTI_LINE);
		}
	}

}
