import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoItComponent } from './do-it.component';

describe('DoItComponent', () => {
  let component: DoItComponent;
  let fixture: ComponentFixture<DoItComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoItComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoItComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
