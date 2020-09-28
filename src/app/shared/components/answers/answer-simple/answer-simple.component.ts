import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AnswerFactory } from '@app/shared/factories/answer.factory';
import { AnswerType } from '@app/shared/models';

export interface AnswerSimple {
    id: number;
    content: string;
}

@Component({
    selector: 'exagen-answer-simple',
    templateUrl: './answer-simple.component.html',
    styleUrls: ['./answer-simple.component.scss']
})
export class AnswerSimpleComponent implements OnInit {

    @Input()
    public form: FormGroup;

    @Input()
    public allowDeletion = false;

    @Output()
    public onDelete: EventEmitter<AnswerSimple> = new EventEmitter();

    constructor(private readonly answerFactory: AnswerFactory) { }

    ngOnInit() {
        if (!this.form) {
            this.form = this.answerFactory.createAnswerForm(AnswerType.SINGLE_CHOICE);
        }
    }

    public delete(): void {
        this.onDelete.emit(this.form.value as AnswerSimple);
    }

}
