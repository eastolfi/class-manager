import { ReactiveFormsModule } from '@angular/forms';
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";

import { AnswerMultilineComponent } from "../app/shared/components/answer-multiline/answer-multiline.component";
import { AnswerMultilineMapper } from '../app/shared/components/answer-multiline/answer-multiline.mapper';
import { AnswerMultiline } from '../app/shared/models/implementations/answer.multiline';

storiesOf("Answers/Multi Line", module)
    .addDecorator(
        moduleMetadata({
            imports: [
                ReactiveFormsModule,
                MDBBootstrapModulesPro
            ]
        })
    )
    .add("by default", () => ({
        component: AnswerMultilineComponent,
        props: {
            parentForm: AnswerMultilineMapper.createFormGroup()
        }
    }))
    .add("with a multiline content", () => ({
        component: AnswerMultilineComponent,
        props: {
            parentForm: AnswerMultilineMapper.createFormGroupFromModel({
                content: "First Line\nSecond Line\nThird Line"
            } as AnswerMultiline)
        }
    }))
