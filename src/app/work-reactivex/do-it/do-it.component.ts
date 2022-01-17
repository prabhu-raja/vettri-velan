import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  concat,
  EMPTY,
  from,
  fromEvent,
  interval,
  merge,
  Observable,
  Observer,
  of,
  range,
  timer
} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  catchError,
  concatMap,
  debounce,
  debounceTime,
  delay,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  endWith,
  exhaustMap,
  filter,
  first,
  map,
  mapTo,
  mergeAll,
  mergeMap,
  pluck,
  reduce,
  scan,
  startWith,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap
} from 'rxjs/operators';
import { iterator } from '../../app.service';
@Component({
  selector: 'app-do-it',
  templateUrl: './do-it.component.html',
  styleUrls: ['./do-it.component.scss']
})
export class DoItComponent implements OnInit {
  hasCountdownTimer = false;
  timerValue: number;
  @ViewChild('btnAbort', {static: true}) btnAbort: ElementRef<HTMLButtonElement>;

  constructor() { }

  ngOnInit() {
    // this.basic();
    // this.basic2();
    // this.operatorFromEvent();
    // this.operatorOf();
    // this.operatorRange();
    // this.operatorFrom();
    // this.operatorInterval();
    // this.operatorTimer();
    // this.operatorTap();

    /**
     * Transformation Operator Starts
     */
    // this.transformationMap();
    // this.transformationPluck();
    // this.transformationMapTo();
    // this.transformationReduce();
    // this.transformationScan();
    /**
     * Transformation Operator Ends
     */


    /**
     * Filtering Operator Starts
     */
    // this.filteringFilter();
    // this.filteringTake();
    // this.filteringFirst();
    // this.filteringTakeWhile();
    // this.filteringTakeUntil();
    // this.filteringDistinctUntilChanged();
    // this.filteringDistinctUntilKeyChanged();
    // this.filteringDebounceTime();
    // this.filteringDebounce();
    /**
     * Filtering Operator Ends
     */

    /**
     * Flattening Operator Starts
     */
    // this.flatMergeAll();
    // this.flatMergeMap();
    // this.flatMergeMapCons();
    // this.flatMergeMapVsSwitchMap();
    // this.flatSwitchMap();
    // this.flatConcatMap();
    // this.flatExhaustMap();
    // this.flatMergeMapVsSwitchMapVSConcatMapVsExhaustMap();
    // this.flatCatchError();
    /**
     * Flattening Operator Ends
     */

    /**
     * Comination Starts
     */
    // this.combStartsWithEndsWith();
    // this.combConcat();
    this.combMerge();
    /**
     * Comination Ends
     */

    // this.countDownTimer();
  }

  private basic() {
    const observer: Observer<string> = {
      next: val => console.log(`value of next is ${val}`),
      error: err => console.log(`value of error is ${err}`),
      complete: () => console.log('completed!')
    };
    const $observable = new Observable(subscriber => {
      subscriber.next('Hello');
      subscriber.next('World');
      subscriber.complete();
      subscriber.next('This wont be received by observer');
    });
    $observable.subscribe(observer);
  }

  private basic2() {
    const observer: Observer<string> = {
      next: val => console.log(`value of next is ${val}`),
      error: err => console.log(`value of error is ${err}`),
      complete: () => console.log('completed!')
    };
    const $observable = new Observable(subscriber => {
      let count = 0;

      // * Deliver values asynchronously
      const id = setInterval(() => {
        subscriber.next(count);
        count += 1;
        subscriber.complete();
      }, 1000);

      // * Clear interval once complete ( kind of unsubscribe)
      return () => {
        console.log('Called');
        clearInterval(id);
      };

    });
    $observable.subscribe(observer);
  }

  private operatorFromEvent() {
    const observer: Observer<any> = {
      next: val => console.log(`value of next is ${val}`),
      error: err => console.log(`value of error is ${err}`),
      complete: () => console.log('completed!')
    };
    const source$ = fromEvent(document, 'keyup');
    const subOne = source$.subscribe(observer);
    const subTwo = source$.subscribe(observer);
    subTwo.add(subOne);
    setTimeout(() => {
      subTwo.unsubscribe();
    }, 4000);
  }

  private operatorOf() {
    const observer: Observer<any> = {
      next: val => console.log(`value of next is ${val}`),
      error: err => console.log(`value of error is ${err}`),
      complete: () => console.log('completed!')
    };
    const source$ = of(1, 2, 3, 4, 5);
    source$.subscribe(observer);
  }

  private operatorRange() {
    const observer: Observer<any> = {
      next: val => console.log(`value of next is ${val}`),
      error: err => console.log(`value of error is ${err}`),
      complete: () => console.log('completed!')
    };
    const source$ = range(1, 10);
    source$.subscribe(observer);
  }

  private operatorFrom() {
    const observer: Observer<any> = {
      next: val => console.log(`value of next is ${val}`),
      error: err => console.log(`value of error is ${err}`),
      complete: () => console.log('completed!')
    };
    // const source$ = of([1, 2, 3, 4, 5]);
    const source$ = from([1, 2, 3, 4, 5]);
    source$.subscribe(observer);

    /**
     * ?Using the Iterator from JS Generator function
     */
    console.log(iterator.next().value);
    console.log(iterator.next().value); // ! Here we must each and every time. but from operator iterate all at a time.
  }

  private operatorInterval() {
    const source$ = interval(1000);
    source$.subscribe(console.log);
  }

  private operatorTimer() {
    // start the timer after 3 sec
    const source$ = timer(3000, 1000);
    source$.subscribe(console.log);
  }

  private operatorTap() {
    of(1, 2, 3, 4, 5)
      .pipe(
        tap(val => console.log(`Before map ${val}`)),
        map(val => val * 10),
        tap({
          next: val => console.log(`After map ${val}`),
          complete: () => console.log(`Completed!`)
        }),
      )
      .subscribe(val => console.log(`Subscribed 🚰 Val ${val}`));
  }

  private transformationMap() {
    // of(1, 2, 3, 4, 5)
    //   .pipe(map(val => val * 10))
    //   .subscribe(console.log);

    // const keyup$ = fromEvent(document, 'keyup');
    // const keycode$ = keyup$.pipe(
    //   map((event: KeyboardEvent) => event.code)
    // );
    // keycode$.subscribe(console.log);

    fromEvent(document, 'keyup')
      .pipe(
        map((event: KeyboardEvent) => event.code)
      )
      .subscribe(console.log);
  }

  private transformationPluck() {
    // const keyup$ = fromEvent(document, 'keyup');
    // const keycode$ = keyup$.pipe(
    //   pluck('code')
    // );
    // keycode$.subscribe(val => console.log(`Pluck is ${val}`));

    fromEvent(document, 'keyup')
      .pipe(
        pluck('code')
      )
      .subscribe(val => console.log(`Pluck Value ${val}`));
  }

  private transformationMapTo() {
    const keyup$ = fromEvent(document, 'keyup');
    const keycode$ = keyup$.pipe(
      mapTo('🔥🥶')
    );
    keycode$.subscribe(val => console.log(`mapTo is ${val}`));
  }

  private transformationReduce() {
    /*
    const numbers = [1, 2, 3, 4, 5];
    const total = numbers.reduce((accumulator, currentValue) => {
      console.log(`accumulator - ${accumulator} | currentValue - ${currentValue}`);
      return accumulator + currentValue;
    }, 0);
    console.log(`Total - ${total}`);
    */

    interval(1000)
      .pipe(
        take(5),
        reduce((accumulator, currentValue) => {
          console.log(`accumulator - ${accumulator} | currentValue - ${currentValue}`);
          return accumulator + currentValue;
        }, 0)
      )
      .subscribe({
        next: total => console.log(`Total - ${total}`),
        complete: () => console.log('Completed!')
      });
  }

  private transformationScan() {
    const numbers = [1, 2, 3, 4, 5];
    from(numbers)
      .pipe(scan((accumulator, currentValue) => accumulator + currentValue, 0))
      .subscribe(val => console.log(`scan value - ${val}`));
  }

  private filteringFilter() {
    // of(1, 2, 3, 4, 5)
    //   .pipe(filter(val => val > 2))
    //   .subscribe(console.log);
    const keyup$ = fromEvent(document, 'keyup');
    const keycode$ = keyup$
      .pipe(pluck('code'));
    const enter$ = keycode$
      .pipe(filter(val => val === 'Enter'));

    keycode$.subscribe(val => console.log(`Pluck is ${val}`));
    enter$.subscribe(val => console.log(`Filter only ${val}`));
  }

  private filteringTake() {
    // of(1, 2, 3, 4, 5)
    //   .pipe(take(3))
    //   .subscribe({
    //     next: val => console.log(`Value is ${val}`),
    //     complete: () => console.log('Take Completed!')
    //   });
    fromEvent(document, 'click')
      .pipe(
        map((evt: MouseEvent) => ({
          x: evt.clientX,
          y: evt.clientY
        })),
        take(1)
      )
      .subscribe({
        next: console.log,
        complete: () => console.log('Take Completed!')
      });
  }

  private filteringFirst() {
    // of(1, 2, 3, 4, 5)
    //   .pipe(first(val => val > 2)) // ! First will do Filter and Take(1)
    //   .subscribe({
    //     next: val => console.log(`Value is ${val}`),
    //     complete: () => console.log('First Completed!')
    //   });
    fromEvent(document, 'click')
      .pipe(
        map((evt: MouseEvent) => ({
          x: evt.clientX,
          y: evt.clientY
        })),
        first(({x}) => x > 200 ) // ! First will do Filter and Take(1)
      )
      .subscribe({
        next: console.log,
        complete: () => console.log('First Completed!')
      });
  }

  private filteringTakeWhile() {
    /*
    of(1, 2, 3, 4, 5)
      .pipe(takeWhile(val => val < 3, true)) // ! TakeWhile will run until condition is false
       ! if 2nd param is true, then it will emit last false value
       ! i.e here it will emit until 3
      .subscribe({
        next: val => console.log(`Value is ${val}`),
        complete: () => console.log('TakeWhile Completed!')
      });
    */
    fromEvent(document, 'click')
      .pipe(
        map((evt: MouseEvent) => ({
          x: evt.clientX,
          y: evt.clientY
        })),
        takeWhile(({x}) => x > 200, true) // ! TakeWhile will run until condition is false
        // ! if 2nd param is true, then it will emit last false value
      )
      .subscribe({
        next: console.log,
        complete: () => console.log('TakeWhile Completed!')
      });
  }

  private filteringTakeUntil() {
    const counter$ = interval(1000);
    const click$ = fromEvent(document, 'click');
    counter$
      .pipe(takeUntil(click$))
      .subscribe({
        next: console.log,
        complete: () => console.log('Take Until completed!')
      });
  }

  private filteringDistinctUntilChanged() {
    // https://app.ultimatecourses.com/course/rxjs-basics/ignore-non-unique-values-using-distinctuntilchanged
    // of(1, 2, 3, 3, 3, 4, 5)
    //   .pipe(distinctUntilChanged())
    //   .subscribe(console.log);
    of(1, 2, 3, 3, 3, 4, 5, 3)
      .pipe(distinctUntilChanged())
      .subscribe(console.log);
  }

  private filteringDistinctUntilKeyChanged() {
    // https://app.ultimatecourses.com/course/rxjs-basics/ignore-non-unique-values-using-distinctuntilchanged
    interface User {
        name: string;
        loggedIn: boolean;
        token: string;
    }
    const user: User[] = [
      { name: 'Brian', loggedIn: false, token: null },
      { name: 'Brian', loggedIn: true, token: 'abc' },
      { name: 'Lara', loggedIn: true, token: 'xyz' },
      { name: 'Brian', loggedIn: true, token: '123' }
    ];
    const state$: Observable<any> = from(user).pipe(
      scan((accumulator, currentValue) => {
        return { ...accumulator, ...currentValue };
      }, {})
    );
    const name$ = state$.pipe(
      distinctUntilKeyChanged('name'),
      map((val: any) => val.name),
    );
    name$.subscribe(console.log);
  }

  private filteringDebounceTime() {
    const inbputbox = document.getElementById('text-input');
    const input$ = fromEvent(inbputbox, 'keyup');
    input$
      .pipe(
        debounceTime(1000),
        pluck('target', 'value'),
        distinctUntilChanged()
      )
      .subscribe(console.log);
  }

  private filteringDebounce() {
    const inbputbox = document.getElementById('text-input');
    const input$ = fromEvent(inbputbox, 'keyup');
    input$
      .pipe(
        debounce(() => interval(500)),
        pluck('target', 'value'),
        distinctUntilChanged()
      )
      .subscribe(console.log);
  }

  private flatMergeAll() {
    const inbputbox = document.getElementById('text-input');
    const input$ = fromEvent<any>(inbputbox, 'keyup');
    const term$ = input$.pipe(map(evt => evt.target.value));
    // term$
    //   .pipe(
    //     debounceTime(1000),
    //     map(term => ajax.getJSON(`http://api.github.com/users/${term}`)),
    //   ).subscribe(console.log);
    // ! if you hover in above subscribe it display as Observable<Observable<unknown>>.subscribe
    // ! since term$ has one observable and ajax.getJSON returns another observable.
    // ! To avoid this use mergeAll
    term$
      .pipe(
        debounceTime(1000),
        map(term => ajax.getJSON(`http://api.github.com/users/${term}`)),
        mergeAll()
      ).subscribe(console.log);

  }

  private flatMergeMap() {
    // ! cloned from the above mergeAll
    // ! instead of map and mergeAll we may use mergeMap as below
    const inbputbox = document.getElementById('text-input');
    const input$ = fromEvent<any>(inbputbox, 'keyup');
    const term$ = input$.pipe(map(evt => evt.target.value));
    term$
      .pipe(
        debounceTime(1000),
        mergeMap(term => ajax.getJSON(`http://api.github.com/users/${term}`)),
      ).subscribe(console.log);
  }

  private flatMergeMapCons() {
    const mousedown$ = fromEvent(document, 'mousedown');
    const mouseup$ = fromEvent(document, 'mouseup');
    const interval$ = interval(1000);
    mousedown$
      .pipe(
        mergeMap(() => interval$)
      )
      .subscribe(console.log);
    // ! in above example every mousedown click it will create new interval
    // ! to avoid we need unsubscribe the inner observable as below
    // ? But below code is not working
    // tslint:disable-next-line:max-line-length
    // ? only works here - no idea 😢 (https://app.ultimatecourses.com/course/rxjs-basics/flatten-inner-observables-as-they-occur-with-mergemap)
    // mousedown$
    //   .pipe(
    //     mergeMap(() => interval$.pipe(takeUntil(mouseup$))
    //     ),
    //   )
    //   .subscribe(console.log);
  }

  private flatMergeMapVsSwitchMap() {
    const click$ = fromEvent(document, 'click');
    const interval$  = interval(1000);
    // ! in mergeMap every click it will create new interval
    // click$.pipe(
    //   mergeMap(() => interval$)
    // )
    // .subscribe(console.log);
    // ! in switchMap every click it will clear/unsubscribe the previous interval
    click$.pipe(
      switchMap(() => interval$)
    )
    .subscribe(console.log);
  }

  private flatSwitchMap() {
    // ! in text box search as dog, cat etc
    const BASE_URL = 'https://api.openbrewerydb.org/breweries';
    const inbputbox = document.getElementById('text-input');
    const input$ = fromEvent<any>(inbputbox, 'keyup');
    const typeaheadContainer = document.getElementById('typeahead-container');

    input$.pipe(
      debounceTime(200),
      pluck('target', 'value'),
      distinctUntilChanged(),
      switchMap(searchTerm => ajax.getJSON(`${BASE_URL}?by_name=${searchTerm}`))
    )
    .subscribe((res: []) => {
      typeaheadContainer.innerHTML = res.map((val: any) => val.name).join('<br>');
    });
    // ! If we try without debounceTime we can see the cancelled request for previous value in network tab
    // input$.pipe(
    //   pluck('target', 'value'),
    //   distinctUntilChanged(),
    //   switchMap(searchTerm => ajax.getJSON(`${BASE_URL}?by_name=${searchTerm}`))
    // )
    // .subscribe((res: []) => {
    //   typeaheadContainer.innerHTML = res.map((val: any) => val.name).join('<br>');
    // });

  }

  private flatConcatMap() {
    /*
    const click$ = fromEvent(document, 'click');
    const interval$ = interval(1000);
    ! when we click 4 times it will emit syncly. once 1st observable completed wit will emit 2nd.
    click$.pipe(
      concatMap(() => (
        interval$.pipe(take(3)
      )))
    )
    .subscribe(console.log);
    */

    const saveAnswer = ans => of(`Saved answer is ${ans}`).pipe(delay(1500));
    const radioBtns = document.querySelectorAll('.radio-option');
    const answerChanges$ = fromEvent(radioBtns, 'click');
    answerChanges$.pipe(
      concatMap((evt: any) => saveAnswer(evt.target.value))
    )
    .subscribe({
      next: val => console.log(val),
      complete: () => console.log('ConcatMap Complete!')
    });
  }

  private flatExhaustMap() {
    /*
    const click$ = fromEvent(document, 'click');
    const interval$ = interval(1000);
    ! we may click any time only 1st observable emit. once that completed it will take other clicks
    click$.pipe(
      exhaustMap(() => interval$.pipe(take(3)))
    )
    .subscribe({
      next: console.log,
      complete: () => console.log('exhaust complete')
    });
    */
    const authenticateUser = () => {
      return ajax.post('https://reqres.in/api/login', {
        email: 'eve.holt@reqres.in',
        password: 'welcome'
      });
    };
    const loginBtn = document.getElementById('login');
    const click$ = fromEvent(loginBtn, 'click');
    click$.pipe(
      exhaustMap(() => authenticateUser())
    )
    .subscribe({
      next: console.log,
      complete: () => console.log('exhaust complete')
    });
    // ! When user clicks 2 times exhaust will takes the firt and omits the next inner obeervable.
  }

  private flatMergeMapVsSwitchMapVSConcatMapVsExhaustMap() {
    const authenticateUser = () => {
      return ajax.post('https://reqres.in/api/login', {
        email: 'eve.holt@reqres.in',
        password: 'welcome'
      });
    };
    const loginBtn = document.getElementById('login');
    const click$ = fromEvent(loginBtn, 'click');
    click$.pipe(
      // exhaustMap(() => authenticateUser())
      // mergeMap(() => authenticateUser())
      // switchMap(() => authenticateUser())
      concatMap(() => authenticateUser())
    )
    .subscribe({
      next: console.log,
      complete: () => console.log('exhaust complete')
    });
  }

  private flatCatchError() {
    // ! To get error select offline from throttle dropdown in dev tools
    const BASE_URL = 'https://api.openbrewerydb.org/breweries';
    const inbputbox = document.getElementById('text-input');
    const input$ = fromEvent<any>(inbputbox, 'keyup');
    const typeaheadContainer = document.getElementById('typeahead-container');

    input$.pipe(
      debounceTime(200),
      pluck('target', 'value'),
      distinctUntilChanged(),
      switchMap(searchTerm => (
        ajax.getJSON(`${BASE_URL}?by_name=${searchTerm}`)
          .pipe(
            catchError((err, caught) => {
              console.log('INNER', err);
              return EMPTY;
              // return of(err.message);
              // return caught; // !dont use this it will retry so many times
            })
          )
      )),
    )
    .subscribe({
      next: (res: []) => typeaheadContainer.innerHTML = res.map((val: any) => val.name).join('<br>'),
      complete: () => console.log('Catch Err Complete!'),
      error: err => console.log(`ERR - ${err}`)
    });
  }

  private combStartsWithEndsWith() {
    const numbers$ = of(1, 2, 3);
    numbers$.pipe(
      startWith('🏎', '🚗'),
      endWith('🏁')
    )
    .subscribe({
      next: val => console.log(val),
      complete: () => console.log('Combination complete!')
    });
  }

  private combConcat() {
    const interval$ = interval(1000);
    concat(
      interval$.pipe(take(3)),
      interval$.pipe(take(2))
    )
    .subscribe({
      next: val => console.log(val),
      complete: () => console.log('Combination complete!')
    });
  }

  private combMerge() {
    const click$ = fromEvent(document, 'click');
    const keyup$ = fromEvent(document, 'keyup');
    merge(keyup$, click$)
      .subscribe({
        next: val => console.log(val),
        complete: () => console.log('Combination complete!')
      });
  }

  private countDownTimer() {
    this.hasCountdownTimer = true;
    const startFrom = 10;
    // this.timerValue = startFrom;
    const click$ = fromEvent(this.btnAbort.nativeElement, 'click');
    interval(1000)
      .pipe(
        mapTo(-1),
        scan((accumulator, currentValue) => {
          console.log(`accumulator  ${accumulator} | currentValue  ${currentValue}`);
          return accumulator + currentValue;
        }, startFrom),
        tap(val => console.log(`Before filter ${val}`)),
        takeWhile(val => val >= 0),
        takeUntil(click$),
        startWith(startFrom)
      )
      .subscribe({
        next: val => {
          this.timerValue = val;
          console.log(`countdown ${val}`);
        },
        complete: () => console.log('⏳ completed')
      });
  }

}
