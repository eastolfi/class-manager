import { storiesOf, moduleMetadata } from "@storybook/angular";
import { action, decorate } from "@storybook/addon-actions";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";

import { ScoreCalculatorComponent, CalculationType } from "../app/shared/components/score-calculator/score-calculator.component";

storiesOf("Score Calculator/Simple", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				MDBBootstrapModulesPro
			]
		})
	)
	.add("with no answers", () => ({
		component: ScoreCalculatorComponent,
		props: {
			calculationType: CalculationType.SIMPLE
		}
	}))
	.add("with one answer", () => ({
		component: ScoreCalculatorComponent,
		props: {
			totalScore: 1,
			totalAnswers: 1,
			calculationType: CalculationType.SIMPLE,
			scoreCalculated: action("Score Recalculated")
		}
	}))

storiesOf("Score Calculator/Total", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				MDBBootstrapModulesPro
			]
		})
	)
	.add("with no answers", () => ({
		component: ScoreCalculatorComponent,
		props: {
			calculationType: CalculationType.CALCULATE_TOTAL
		}
	}))
	.add("with answers", () => ({
		component: ScoreCalculatorComponent,
		props: {
			totalAnswers: 3,
			scorePerAnswer: 2,
			calculationType: CalculationType.CALCULATE_TOTAL,
			scoreCalculated: action("Score Recalculated")
		}
	}))

storiesOf("Score Calculator/Per Answer", module)
	.addDecorator(
		moduleMetadata({
			imports: [
				MDBBootstrapModulesPro
			]
		})
	)
	.add("with no answers", () => ({
		component: ScoreCalculatorComponent,
		props: {
			calculationType: CalculationType.CALCULATE_INDIVIDUAL
		}
	}))
	.add("with answers", () => ({
		component: ScoreCalculatorComponent,
		props: {
			totalScore: 10,
			totalAnswers: 3,
			calculationType: CalculationType.CALCULATE_INDIVIDUAL,
			scoreCalculated: action("Score Recalculated")
		}
	}))