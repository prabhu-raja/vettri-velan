import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxRateLimitingComponent } from './rx-rate-limiting.component';

describe('RxRateLimitingComponent', () => {
  let component: RxRateLimitingComponent;
  let fixture: ComponentFixture<RxRateLimitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxRateLimitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxRateLimitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
