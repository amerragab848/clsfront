import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCycleComponent } from './sales-cycle.component';

describe('SalesCycleComponent', () => {
  let component: SalesCycleComponent;
  let fixture: ComponentFixture<SalesCycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesCycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesCycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
