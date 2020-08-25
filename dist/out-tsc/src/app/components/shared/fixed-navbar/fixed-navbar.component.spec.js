import { async, TestBed } from '@angular/core/testing';
import { FixedNavbarComponent } from './fixed-navbar.component';
describe('FixedNavbarComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FixedNavbarComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(FixedNavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=fixed-navbar.component.spec.js.map