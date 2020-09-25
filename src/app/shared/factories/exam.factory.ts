import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class ExamFactory {
    constructor(private readonly fb: FormBuilder) {}

    public createExamForm(): FormGroup {
        return this.fb.group({
            documentName: ['examen'],
            questions: this.fb.array([])
        });
    }
}
