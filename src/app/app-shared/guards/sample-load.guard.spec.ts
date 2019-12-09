import { TestBed, async, inject } from '@angular/core/testing';

import { SampleLoadGuard } from './sample-load.guard';

describe('SampleLoadGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SampleLoadGuard]
    });
  });

  it('should ...', inject([SampleLoadGuard], (guard: SampleLoadGuard) => {
    expect(guard).toBeTruthy();
  }));
});
