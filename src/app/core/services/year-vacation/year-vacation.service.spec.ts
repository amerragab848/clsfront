import { TestBed } from '@angular/core/testing';

import { YearVacationService } from './year-vacation.service';

describe('YearVacationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YearVacationService = TestBed.get(YearVacationService);
    expect(service).toBeTruthy();
  });
});
