import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";

import { QuestionTitleComponent } from "../app/shared/components/question-title/question-title.component";

storiesOf("Question Title", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				MDBBootstrapModulesPro
			]
		})
	)
	.add("single-line", () => ({
		component: QuestionTitleComponent,
		props: {}
	}))
	.add("single-line with score event", () => ({
		component: QuestionTitleComponent,
		props: {
			multiline: false,
			showScoreToggled: action("Show score clicked")
		}
	}))
	.add("multi-line", () => ({
		component: QuestionTitleComponent,
		props: {
			multiline: true
		}
	}))
	.add("multi-line with score event", () => ({
		component: QuestionTitleComponent,
		props: {
			multiline: true,
			showScoreToggled: action("Show score clicked")
		}
	}))