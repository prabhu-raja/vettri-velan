import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolderLandingComponent } from './holder-landing.component';

describe('HolderLandingComponent', () => {
  let component: HolderLandingComponent;
  let fixture: ComponentFixture<HolderLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolderLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolderLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
