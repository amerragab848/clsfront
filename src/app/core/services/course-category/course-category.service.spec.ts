import { TestBed } from '@angular/core/testing';

import { CourseCategoryService } from './course-category.service';

describe('CourseCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseCategoryService = TestBed.get(CourseCategoryService);
    expect(service).toBeTruthy();
  });
});
