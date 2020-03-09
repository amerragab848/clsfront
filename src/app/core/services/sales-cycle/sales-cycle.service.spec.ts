import { TestBed } from '@angular/core/testing';

import { SalesCycleService } from './sales-cycle.service';

describe('SalesCycleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesCycleService = TestBed.get(SalesCycleService);
    expect(service).toBeTruthy();
  });
});
