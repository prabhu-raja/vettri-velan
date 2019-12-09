import { TestBed, async, inject } from '@angular/core/testing';

import { SampleActivateGuard } from './sample-activate.guard';

describe('SampleActivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleActivateGuard]
    });
  });

  it('should ...', inject([SampleActivateGuard], (guard: SampleActivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
