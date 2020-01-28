import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxSubjectComponent } from './rx-subject.component';

describe('RxSubjectComponent', () => {
  let component: RxSubjectComponent;
  let fixture: ComponentFixture<RxSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
