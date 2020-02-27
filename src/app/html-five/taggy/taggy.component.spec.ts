import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggyComponent } from './taggy.component';

describe('TaggyComponent', () => {
  let component: TaggyComponent;
  let fixture: ComponentFixture<TaggyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaggyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
