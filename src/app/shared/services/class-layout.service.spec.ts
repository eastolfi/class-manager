import { TestBed } from '@angular/core/testing';

import { ClassLayoutService } from './class-layout.service';

describe('ClassLayoutService', () => {
  let service: ClassLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
