import { TestBed, async, inject } from '@angular/core/testing';

import { SampleActivateChildGuard } from './sample-activate-child.guard';

describe('SampleActivateChildGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleActivateChildGuard]
    });
  });

  it('should ...', inject([SampleActivateChildGuard], (guard: SampleActivateChildGuard) => {
    expect(guard).toBeTruthy();
  }));
});
