import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxCombinationComponent } from './rx-combination.component';

describe('RxCombinationComponent', () => {
  let component: RxCombinationComponent;
  let fixture: ComponentFixture<RxCombinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxCombinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
