import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxTransformationComponent } from './rx-transformation.component';

describe('RxTransformationComponent', () => {
  let component: RxTransformationComponent;
  let fixture: ComponentFixture<RxTransformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxTransformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxTransformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
