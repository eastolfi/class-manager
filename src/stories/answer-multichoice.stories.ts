import { storiesOf, moduleMetadata } from "@storybook/angular";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";

import { AnswerMultichoiceComponent } from "../app/shared/components/answer-multichoice/answer-multichoice.component";
import { AnswerType } from "../app/shared/models/answer";

storiesOf("Answers/Multi Choice", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				MDBBootstrapModulesPro
			]
		})
	)
	.add("standard", () => ({
		component: AnswerMultichoiceComponent,
		props: {}
	}))
	.add("with one answer", () => ({
		component: AnswerMultichoiceComponent,
		props: {
			answer: {
				id: 1,
				type: AnswerType.MULTI_CHOICE,
				content: new Set([{
					id: 1,
					type: AnswerType.SINGLE_CHOICE,
					content: "Answer 1"
				}])
			}
		}
	}))
	.add("with score per answer", () => ({
		component: AnswerMultichoiceComponent,
		props: {
			scorePerAnswer: 5,
			answer: {
				id: 1,
				type: AnswerType.MULTI_CHOICE,
				content: new Set([{
					id: 1,
					type: AnswerType.SINGLE_CHOICE,
					content: "Answer 1"
				}, {
					id: 1,
					type: AnswerType.SINGLE_CHOICE,
					content: "Answer 2"
				}])
			}
		}
	}))
