import { TestBed } from '@angular/core/testing';

import { MenuOpenerStateService } from './menu-opener-state.service';

describe('MenuOpenerStateService', () => {
  let service: MenuOpenerStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuOpenerStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
