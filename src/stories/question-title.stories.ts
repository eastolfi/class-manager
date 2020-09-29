import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action } from "@storybook/addon-actions";

import { QuestionTitleComponent } from "../app/shared/components/question-title/question-title.component";

storiesOf("Question Title", module)
	.addDecorator(
		moduleMetadata({
			imports: [
			]
		})
	)
	.add("single-line by default", () => ({
		component: QuestionTitleComponent,
		props: {}
	}))
	.add("single-line without score", () => ({
		component: QuestionTitleComponent,
		props: {
			multiline: false,
			title: {
				title: "Question Title"
			},
			showScoreToggled: action("Show score clicked")
		}
	}))
	.add("single-line with score", () => ({
		component: QuestionTitleComponent,
		props: {
			multiline: false,
			title: {
				title: "Question Title",
				score: 5,
				showScore: true
			},
			showScoreToggled: action("Show score clicked")
		}
	}))
	.add("multi-line without score", () => ({
		component: QuestionTitleComponent,
		props: {
			multiline: true,
			title: {
				title: "Question Title\nSecond Line"
			},
			showScoreToggled: action("Show score clicked")
		}
	}))
	.add("multi-line with score", () => ({
		component: QuestionTitleComponent,
		props: {
			multiline: true,
			title: {
				title: "Question Title\nSecond Line",
				score: 5,
				showScore: true
			},
			showScoreToggled: action("Show score clicked")
		}
	}))
