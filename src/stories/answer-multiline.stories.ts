import { storiesOf, moduleMetadata } from "@storybook/angular";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";

import { AnswerMultilineComponent } from "../app/shared/components/answer-multiline/answer-multiline.component";

storiesOf("Answers/Multi Line", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				MDBBootstrapModulesPro
			]
		})
	)
	.add("by default", () => ({
		component: AnswerMultilineComponent,
		props: {}
	}))
	.add("with a multiline content", () => ({
		component: AnswerMultilineComponent,
		props: {
			
		}
	}))