import { TestBed } from '@angular/core/testing';

import { CourseOutlineService } from './course-outline.service';

describe('CourseOutlineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseOutlineService = TestBed.get(CourseOutlineService);
    expect(service).toBeTruthy();
  });
});
