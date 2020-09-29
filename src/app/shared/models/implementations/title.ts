import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ITitle } from "../interfaces/title";

export class Title implements ITitle {
	public title: string = "";
	public score?: number;
	public showScore: boolean = false;

	public static toFormGroup(title: Title): FormGroup {
		return new FormGroup({
			title: new FormControl(title.title, Validators.required),
			score: new FormControl(title.score),
			showScore: new FormControl(title.showScore, Validators.required)
		})
	}

	public static fromFormGroup(fg: FormGroup): Title {
		let title = new Title()

		title.title = fg.get('title').value as string
		title.score = fg.get('title').value as number
		title.showScore = fg.get('title').value as boolean

		return title
	}
}
