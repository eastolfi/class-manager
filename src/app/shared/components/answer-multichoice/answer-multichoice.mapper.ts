import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { AnswerType } from '@app/shared/models';

export class AnswerMultichoiceMapper {
	public static createFormGroup() {
		return new FormGroup({
            type: new FormControl(AnswerType.MULTI_CHOICE),
			content: new FormArray([]),
			scorePerAnswer: new FormControl(0)
		})
	}
}
