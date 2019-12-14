import { TestBed, async, inject } from '@angular/core/testing';

import { SampleDeactivateGuard } from './sample-deactivate.guard';

describe('SampleDeactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleDeactivateGuard]
    });
  });

  it('should ...', inject([SampleDeactivateGuard], (guard: SampleDeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
