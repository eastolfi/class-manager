import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AnswerMultilineComponent } from "./answer-multiline.component";

describe("AnswerMultilineComponent", () => {
	let component: AnswerMultilineComponent;
	let fixture: ComponentFixture<AnswerMultilineComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
			],
			declarations: [AnswerMultilineComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AnswerMultilineComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should have a textarea", () => {
		const compiled = fixture.debugElement.nativeElement;

		expect(compiled.querySelector("#answer-area").tagName.toLowerCase()).toBe("textarea");
	});
});
