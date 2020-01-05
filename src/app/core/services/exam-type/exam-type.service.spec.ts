import { TestBed } from '@angular/core/testing';

import { ExamTypeService } from './exam-type.service';

describe('ExamTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamTypeService = TestBed.get(ExamTypeService);
    expect(service).toBeTruthy();
  });
});
