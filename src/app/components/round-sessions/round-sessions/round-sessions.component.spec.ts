import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundSessionsComponent } from './round-sessions.component';

describe('RoundSessionsComponent', () => {
  let component: RoundSessionsComponent;
  let fixture: ComponentFixture<RoundSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoundSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
