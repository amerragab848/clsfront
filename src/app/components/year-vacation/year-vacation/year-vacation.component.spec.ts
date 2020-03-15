import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearVacationComponent } from './year-vacation.component';

describe('YearVacationComponent', () => {
  let component: YearVacationComponent;
  let fixture: ComponentFixture<YearVacationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearVacationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
