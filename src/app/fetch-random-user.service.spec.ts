import { TestBed } from '@angular/core/testing';

import { FetchRandomUserService } from './fetch-random-user.service';

describe('FetchRandomUserService', () => {
  let service: FetchRandomUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchRandomUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
