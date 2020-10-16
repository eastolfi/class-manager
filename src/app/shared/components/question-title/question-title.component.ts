import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { ITitle } from "../../models/interfaces/title";
import { Title } from "../../models/implementations/title";
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
	selector: "exagen-question-title",
	templateUrl: "./question-title.component.html",
	styleUrls: ["./question-title.component.scss"]
})
export class QuestionTitleComponent implements OnInit {
	@Input()
	public form: FormGroup

	@Input()
	public multiline: boolean = false;

	@Output()
	public toggleScore = new EventEmitter<boolean>();

	constructor(private readonly fb: FormBuilder) {
        if (!this.form) {
            this.form = this.fb.group({
                title: [''],
                showScore: [false],
                score: [0]
            })
        }
    }

	ngOnInit() {
        this.form.get('showScore').valueChanges.subscribe((value: boolean) => {
            this.toggleScore.emit(value);
        })
	}

    public get showScore(): boolean {
        return this.form.get('showScore').value as boolean;
    }

    public get score(): number {
		return this.form.get('score').value as number;
	}
}
