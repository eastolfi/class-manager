import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerSimpleComponent } from './answer-simple.component';

describe('AnswerSimpleComponent', () => {
  let component: AnswerSimpleComponent;
  let fixture: ComponentFixture<AnswerSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
