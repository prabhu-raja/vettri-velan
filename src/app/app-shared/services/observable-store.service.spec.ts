import { TestBed } from '@angular/core/testing';

import { ObservableStoreService } from './observable-store.service';

describe('ObservableStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObservableStoreService = TestBed.get(ObservableStoreService);
    expect(service).toBeTruthy();
  });
});
