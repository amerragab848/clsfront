import { TestBed } from '@angular/core/testing';

import { CorporateService } from './corporate.service';

describe('CorporateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorporateService = TestBed.get(CorporateService);
    expect(service).toBeTruthy();
  });
});
