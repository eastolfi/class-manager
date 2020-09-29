import { ReactiveFormsModule } from '@angular/forms';
import { storiesOf, moduleMetadata } from "@storybook/angular";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AnswerMultilineComponent } from "../app/shared/components/answers/answer-multiline/answer-multiline.component";
import { AnswerMultilineMapper } from '../app/shared/components/answers/answer-multiline/answer-multiline.mapper';
import { AnswerMultiline } from '../app/shared/models/implementations/answer.multiline';

storiesOf("Answers/Multi Line", module)
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
    .add("by default", () => ({
        component: AnswerMultilineComponent,
        props: {
            form: AnswerMultilineMapper.createFormGroup()
        }
    }))
    .add("with a multiline content", () => ({
        component: AnswerMultilineComponent,
        props: {
            form: AnswerMultilineMapper.createFormGroupFromModel({
                content: "First Line\nSecond Line\nThird Line"
            } as AnswerMultiline)
        }
    }))
