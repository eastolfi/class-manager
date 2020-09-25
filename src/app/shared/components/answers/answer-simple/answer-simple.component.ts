import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    public onDelete: EventEmitter<void> = new EventEmitter();


    constructor(private readonly fb: FormBuilder) { }

    ngOnInit() {
        if (!this.form) {
            this.form = this.fb.group({
                content: ['']
            })
        }
    }

    public delete(): void {
        this.onDelete.emit();
    }

}
