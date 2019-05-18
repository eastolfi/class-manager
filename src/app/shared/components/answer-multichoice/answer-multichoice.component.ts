import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

import { IAnswer } from "../../models/answer";
import { AnswerMultiple } from "../../models/answer.multiple";
import { AnswerSimple } from "../../models/answer.simple";

@Component({
	selector: "exagen-answer-multichoice",
	templateUrl: "./answer-multichoice.component.html",
	styleUrls: ["./answer-multichoice.component.scss"]
})
export class AnswerMultichoiceComponent implements OnInit {
	@Input()
	public answer: IAnswer = new AnswerMultiple()
	@Output()
	public answersUpdated: EventEmitter<IAnswer> = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	addAnswer() {
		(this.answer.content as Set<IAnswer>).add(new AnswerSimple());

		this.notifyAnswersUpdated();
	}

	deleteAnswer(answer: IAnswer) {
		(this.answer.content as Set<IAnswer>).delete(answer);

		this.notifyAnswersUpdated();
	}

	private notifyAnswersUpdated() {
		this.answersUpdated.emit(this.answer);
	}
}
