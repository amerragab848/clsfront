import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCycleTypeComponent } from './sales-cycle-type.component';

describe('SalesCycleTypeComponent', () => {
  let component: SalesCycleTypeComponent;
  let fixture: ComponentFixture<SalesCycleTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesCycleTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesCycleTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
