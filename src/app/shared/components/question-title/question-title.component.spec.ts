import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { QuestionTitleComponent } from "./question-title.component";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { FormsModule } from "@angular/forms";

describe("QuestionTitleComponent", () => {
	let component: QuestionTitleComponent;
	let fixture: ComponentFixture<QuestionTitleComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				FormsModule,
				MDBBootstrapModulesPro.forRoot()
			],
			declarations: [QuestionTitleComponent]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(QuestionTitleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should have by default a single line input", () => {
		const fixture = TestBed.createComponent(QuestionTitleComponent);
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		
		expect(compiled.querySelector("#title").tagName.toLowerCase()).toBe("input");
	});

	it("should create a multi line input", () => {
		const fixture = TestBed.createComponent(QuestionTitleComponent);
		fixture.componentInstance.multiline = true;
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		
		expect(compiled.querySelector("#title").tagName.toLowerCase()).toBe("textarea");
	});

	it("should subscribe to the score toggle", (done) => {
		const fixture = TestBed.createComponent(QuestionTitleComponent);
		fixture.componentInstance.showScoreToggled.subscribe(checked => {
			expect(checked).toBe(true);

			done();
		})
		
		const compiled = fixture.debugElement.nativeElement;
		fixture.detectChanges();
		compiled.querySelector("#showScoreToggle input[type='checkbox']").click();
		fixture.detectChanges();
	});
});
