import { TestBed } from '@angular/core/testing';

import { AssetVendorService } from './asset-vendor.service';

describe('AssetVendorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetVendorService = TestBed.get(AssetVendorService);
    expect(service).toBeTruthy();
  });
});
