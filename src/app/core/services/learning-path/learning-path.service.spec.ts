import { TestBed } from '@angular/core/testing';

import { LearningPathService } from './learning-path.service';

describe('LearningPathService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LearningPathService = TestBed.get(LearningPathService);
    expect(service).toBeTruthy();
  });
});
