import { ReactiveFormsModule, FormGroup, FormArray, FormControl } from '@angular/forms';
import { storiesOf, moduleMetadata } from "@storybook/angular";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";

import { AnswerMultichoiceComponent } from "../app/shared/components/answer-multichoice/answer-multichoice.component";
import { AnswerType } from "../app/shared/models";

storiesOf("Answers/Multi Choice", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				ReactiveFormsModule,
				MDBBootstrapModulesPro
			]
		})
	)
	.add("standard", () => ({
		component: AnswerMultichoiceComponent,
		props: {
			parentForm: new FormGroup({
				content: new FormArray([])
			})
		}
	}))
	.add("with one answer", () => ({
		component: AnswerMultichoiceComponent,
		props: {
			parentForm: new FormGroup({
				id: new FormControl(1),
				type: new FormControl(AnswerType.MULTI_CHOICE),
				scorePerAnswer: new FormControl(0),
				content: new FormArray([
					new FormGroup({
						id: new FormControl(1),
						type: new FormControl(AnswerType.SINGLE_CHOICE),
						content: new FormControl('Answer 1')
					})
				])
			})
			// answer: {
			// 	id: 1,
			// 	type: AnswerType.MULTI_CHOICE,
			// 	content: new Set([{
			// 		id: 1,
			// 		type: AnswerType.SINGLE_CHOICE,
			// 		content: "Answer 1"
			// 	}])
			// }
		}
	}))
	.add("with score per answer", () => ({
		component: AnswerMultichoiceComponent,
		props: {
			parentForm: new FormGroup({
				id: new FormControl(1),
				type: new FormControl(AnswerType.MULTI_CHOICE),
				scorePerAnswer: new FormControl(5),
				content: new FormArray([
					new FormGroup({
						id: new FormControl(1),
						type: new FormControl(AnswerType.SINGLE_CHOICE),
						content: new FormControl('Answer 1')
					}),
					new FormGroup({
						id: new FormControl(2),
						type: new FormControl(AnswerType.SINGLE_CHOICE),
						content: new FormControl('Answer 2')
					})
				])
			}),
			// scorePerAnswer: 5,
			// answer: {
			// 	id: 1,
			// 	type: AnswerType.MULTI_CHOICE,
			// 	content: new Set([{
			// 		id: 1,
			// 		type: AnswerType.SINGLE_CHOICE,
			// 		content: "Answer 1"
			// 	}, {
			// 		id: 1,
			// 		type: AnswerType.SINGLE_CHOICE,
			// 		content: "Answer 2"
			// 	}])
			// }
		}
	}))
