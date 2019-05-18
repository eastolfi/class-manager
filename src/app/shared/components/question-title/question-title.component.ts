import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "exagen-question-title",
	templateUrl: "./question-title.component.html",
	styleUrls: ["./question-title.component.scss"]
})
export class QuestionTitleComponent implements OnInit {
	@Input()
	public multiline: boolean = false;

	@Output()
	public showScoreToggled = new EventEmitter<boolean>();

	public title: string = "";
	public showScore: boolean = false;

	constructor() { }

	ngOnInit() {
	}

	handleShowScoreClicked(checked: boolean) {
		this.showScore = checked;
		
		this.showScoreToggled.emit(checked);
	}
}
