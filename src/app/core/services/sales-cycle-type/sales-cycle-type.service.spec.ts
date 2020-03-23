import { TestBed } from '@angular/core/testing';

import { SalesCycleTypeService } from './sales-cycle-type.service';

describe('SalesCycleTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesCycleTypeService = TestBed.get(SalesCycleTypeService);
    expect(service).toBeTruthy();
  });
});
