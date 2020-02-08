import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetVendorComponent } from './asset-vendor.component';

describe('AssetVendorComponent', () => {
  let component: AssetVendorComponent;
  let fixture: ComponentFixture<AssetVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
