import { TestBed } from '@angular/core/testing';

import { ErrorStateService } from './error-state.service';

describe('ErrorHandlerService', () => {
  let service: ErrorStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
