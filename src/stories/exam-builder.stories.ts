import { ReactiveFormsModule } from '@angular/forms';
import { storiesOf, moduleMetadata } from "@storybook/angular";

import { COMPONENTS } from "../app/shared/components/components.module";

import { ExamBuilderComponent } from "../app/shared/components/exam-builder/exam-builder.component"
import { AlertModule } from '../app/shared/components/alert';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

storiesOf("Exam Builder", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				ReactiveFormsModule,
				BrowserAnimationsModule,
				AlertModule.forRoot(),
			],
			declarations: [
				...COMPONENTS
			]
		})
	)
	.add("with no questions", () => ({
		component: ExamBuilderComponent
	}))
