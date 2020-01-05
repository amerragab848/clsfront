import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabTypeComponent } from './lab-type.component';

describe('LabTypeComponent', () => {
  let component: LabTypeComponent;
  let fixture: ComponentFixture<LabTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
