import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { ITitle } from "../../models/interfaces/title";
import { Title } from "../../models/implementations/title";

@Component({
	selector: "exagen-question-title",
	templateUrl: "./question-title.component.html",
	styleUrls: ["./question-title.component.scss"]
})
export class QuestionTitleComponent implements OnInit {
	@Input()
	public multiline: boolean = false;
	@Input()
	public title: ITitle = new Title();

	@Output()
	public showScoreToggled = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit() {
	}

	handleShowScoreClicked(event: any) {
		const checked = (event.checked != null) ? event.checked : false;

		this.title.showScore = checked;
		
		this.showScoreToggled.emit(checked);
	}
}
