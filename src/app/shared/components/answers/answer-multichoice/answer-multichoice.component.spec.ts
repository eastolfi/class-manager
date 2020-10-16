import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AnswerMultichoiceComponent, IAnswer } from "./answer-multichoice.component";
import { FormsModule } from "@angular/forms";

describe("AnswerMultichoiceComponent", () => {
	let component: AnswerMultichoiceComponent;
	let fixture: ComponentFixture<AnswerMultichoiceComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule,
			],
			declarations: [AnswerMultichoiceComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AnswerMultichoiceComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should have the 'create answer' button", () => {
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector("#addAnswer").textContent).toBe("Añadir respuesta");
	});

	it("should create an answer", () => {
		// No answers by default
		expect(fixture.componentInstance.answers.size).toBe(0);

		component.addAnswer();

		expect(fixture.componentInstance.answers.size).toBe(1);
	});

	it("should delete an answer", () => {
		// No answers by default
		expect(fixture.componentInstance.answers.size).toBe(0);

		component.addAnswer();

		expect(fixture.componentInstance.answers.size).toBe(1);

		const answer: IAnswer = fixture.componentInstance.answers.values().next().value;
		component.deleteAnswer(answer);

		expect(fixture.componentInstance.answers.size).toBe(0);
	});
});
