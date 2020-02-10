import { TestBed } from '@angular/core/testing';

import { AssetGroupService } from './asset-group.service';

describe('AssetGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetGroupService = TestBed.get(AssetGroupService);
    expect(service).toBeTruthy();
  });
});
