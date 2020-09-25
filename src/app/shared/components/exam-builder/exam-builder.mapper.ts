import { FormGroup, FormArray } from '@angular/forms';

export class ExamBuilderMapper {
	public static createFormGroup(): FormGroup {
		return new FormGroup({
			questions: new FormArray([])
		})
	}
}