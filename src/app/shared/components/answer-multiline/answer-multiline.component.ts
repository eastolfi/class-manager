import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from '@angular/forms';

@Component({
	selector: "exagen-answer-multiline",
	templateUrl: "./answer-multiline.component.html",
	styleUrls: ["./answer-multiline.component.scss"]
})
export class AnswerMultilineComponent implements OnInit {
	@Input()
	public parentForm: FormGroup

	constructor() { }

	ngOnInit() {
	}

}
