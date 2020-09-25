import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AnswerSimpleComponent } from "../app/shared/components/answers/answer-simple/answer-simple.component";

storiesOf("Answers/Simple", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				BrowserAnimationsModule,
				ReactiveFormsModule,
				MatInputModule,
				MatIconModule,
				MatButtonModule
			]
		})
	)
	.add("base without options", () => ({
		component: AnswerSimpleComponent,
		props: {}
	}))
	.add("with an existing form", () => ({
		component: AnswerSimpleComponent,
		props: {
			form: new FormGroup({
				content: new FormControl('Content')
			}),
		}
	}))
	.add("with deletion", () => ({
		component: AnswerSimpleComponent,
		props: {
			allowDeletion: true,
			onDelete: action("Deletion triggered")
		}
	}))
