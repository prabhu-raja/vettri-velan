import { Injectable } from '@angular/core';
import { scan, pluck, distinctUntilKeyChanged } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ObservableStoreService {
  store: BehaviorSubject<User>;
  stateUpdates: Subject<User>;

  constructor() {
    const initialState: User = {name: 'Ryan', isAuthenticated: false};
    this.store = new BehaviorSubject(initialState);
    this.stateUpdates = new Subject();
    // acumulate state
    this.stateUpdates
      .pipe(
        scan((acc: User, curr: User) => {
          return {...acc, ...curr};
        }, initialState)
      )
      .subscribe(this.store);
  }

  updateState(val: User) {
    this.stateUpdates.next(val);
  }

  selectState(stateKey) {
    return this.store
      .pipe(
        distinctUntilKeyChanged(stateKey),
        pluck(stateKey)
      );
  }

  stateChanges() {
    return this.store.asObservable();
  }
}
