import { async, TestBed } from '@angular/core/testing';
import { SalesCycleTypeComponent } from './sales-cycle-type.component';
describe('SalesCycleTypeComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SalesCycleTypeComponent]
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
//# sourceMappingURL=sales-cycle-type.component.spec.js.map