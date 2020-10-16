import { FormGroup, FormControl } from '@angular/forms';
import { AnswerMultiline } from '../../../models/implementations/answer.multiline';

export class AnswerMultilineMapper {
	public static createFormGroup() {
		return new FormGroup({
			content: new FormControl('')
		})
	}

    public static createFormGroupFromModel(model: AnswerMultiline): FormGroup {
        return new FormGroup({
            content: new FormControl(model.content)
        })
    }
}
