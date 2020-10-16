import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { QuestionTitleComponent } from "../app/shared/components/question-title/question-title.component";

storiesOf("Question Title", module)
	.addDecorator(
		moduleMetadata({
			imports: [
                BrowserAnimationsModule,
                ReactiveFormsModule,
                MatInputModule,
                MatCheckboxModule,
			]
		})
	)
	.add("single-line by default", () => ({
		component: QuestionTitleComponent,
	}))
	.add("single-line without score", () => ({
		component: QuestionTitleComponent,
		props: {
			multiline: false,
            form: new FormGroup({
                title: new FormControl('Question Title'),
                score: new FormControl(0),
                showScore: new FormControl(false)
            })
		}
	}))
	.add("single-line with score", () => ({
		component: QuestionTitleComponent,
		props: {
			multiline: false,
			form: new FormGroup({
                title: new FormControl('Question Title'),
                score: new FormControl(5),
                showScore: new FormControl(true)
            }),
			toggleScore: action("Show score clicked")
		}
	}))
	.add("multi-line without score", () => ({
		component: QuestionTitleComponent,
		props: {
			multiline: true,
			form: new FormGroup({
                title: new FormControl('Question Title\nSecond Line'),
                score: new FormControl(0),
                showScore: new FormControl(false)
            }),
		}
	}))
	.add("multi-line with score", () => ({
		component: QuestionTitleComponent,
		props: {
			multiline: true,
			form: new FormGroup({
                title: new FormControl('Question Title\nSecond Line'),
                score: new FormControl(5),
                showScore: new FormControl(true)
            }),
			toggleScore: action("Show score clicked")
		}
	}))
