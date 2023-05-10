import { Component, OnInit } from '@angular/core';
import { Observable, of, range, from, interval, timer, fromEvent } from 'rxjs';
import { iterator } from './app.service';
import {
  map,
  tap,
  pluck,
  mapTo,
  reduce,
  scan,
  filter,
  take,
  first,
  takeWhile,
  takeUntil,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  share
} from 'rxjs/operators';
import { ObservableStoreService } from './app-shared/services/observable-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vettri-velan';
  player1Poistion = 0;
  player2Poistion = 0;

  constructor(
    private storeService: ObservableStoreService
    ) { }

  ngOnInit(): void {
    // this.closureExample();
    // this.player1Roll();
    // this.todo();
    // this.section1();
    // this.section2();
    // this.section3();
    // this.section4();
    // this.test();
    // this.practiceReduce();
    // this.countDownTimer(10);
    // this.practiseTake();
    // this.practiseTakeWhile();
    // this.practiseTakeUntil();
    // this.practiseDistinctUntilChanged();
    // this.playCold();
    // this.playCold2();
    this.playCold2Hot();
    // this.playHot();
    // this.storeService.selectState('name').subscribe(console.log);
    // this.storeService.updateState({name: 'Joe', isAuthenticated: true});
  }

  /**
   * Closure Example by Robin Wieruch
   * https://www.robinwieruch.de/javascript-closure/
   * 
   */
  getEmployeeFactory() {
    let empNumber = 1;
    return function(name, country) {
      const emp = {
        employeeNumber: empNumber++,
        name,
        country
      };
      return emp;
    }
  }
  closureExample() {
    const getEmployee = this.getEmployeeFactory();
    const empOne = getEmployee('Robin', 'Germany');
    const empTwo = getEmployee('Weiruch', 'Germany');
    const employees = [empOne, empTwo];
    console.log('😀', employees);
  }

  playCold2() {
    // * when the data produced inside the observable
    const obs$ = new Observable(obs => {
      obs.next(Math.random())
    });
    obs$.subscribe(res => console.log('🥶-1', res)); // 🥶-1 0.2794320662737444
    obs$.subscribe(res => console.log('🥶-2', res)); // 🥶-2 0.18523626352607492
  }

  playCold2Hot() {
    // * when the data produced outside the observable
    const random = Math.random();
    const obs$ = new Observable(obs => {
      obs.next(random)
    });
    obs$.subscribe(res => console.log('🔥-1', res)); // 🔥-1 0.8657828908179463
    obs$.subscribe(res => console.log('🔥-2', res)); // 🔥-2 0.8657828908179463
  }

  playCold() {
    // This is like watching Netflix
    const interval$ = interval(1000).pipe(take(5));
    interval$.subscribe(val => console.log('subOne🐰 - ', val));
    setTimeout(() => {
      interval$.subscribe(val => console.log('subTwo🐢 - ', val));
    }, 3000);
    /*
    Outout Console:
    subOne🐰 -  0
    subOne🐰 -  1
    subOne🐰 -  2
    subOne🐰 -  3
    subTwo🐢 -  0
    subOne🐰 -  4
    subTwo🐢 -  1
    subTwo🐢 -  2
    subTwo🐢 -  3
    subTwo🐢 -  4
    */
  }

  playHot() {
    // This is like watching live TV show
    const interval$ = interval(1000)
      .pipe(
        take(5),
        share()
      );
    interval$.subscribe(val => console.log('subOne🐰 - ', val));
    setTimeout(() => {
      interval$.subscribe(val => console.log('subTwo🐢 - ', val));
    }, 3000);

    /*
    Output Console:
    subOne🐰 -  0
    subOne🐰 -  1
    subOne🐰 -  2
    subOne🐰 -  3
    subTwo🐢 -  3
    subOne🐰 -  4
    subTwo🐢 -  4
    */
  }

  section1() {
    const observer = {
      next: (val: string) => console.log('next - 🚀', val),
      error: (err: any) => console.log('error - 🚨', err),
      complete: () => console.log('complete! - 👍')
    };

    const observable = new Observable(subscriber => {
      let count = 0;
      const myInterval = setInterval(() => {
        subscriber.next(count);
        count++;
        // if (count > 4) {
        //   subscriber.complete();
        // }
      }, 1000);

      return () => {
        console.log('📣📣📣 called and clearing interval 📣📣📣');
        clearInterval(myInterval);
      };
    });

    const subscription = observable.subscribe(observer);
    const subscriptionTwo = observable.subscribe(observer);
    subscription.add(subscriptionTwo);
    setTimeout(() => {
      subscription.unsubscribe();
      // subscriptionTwo.unsubscribe();
    }, 3500);

    // observable.subscribe(
    //   test => console.log(`Iam with ${test}`),
    //   err => console.error(`Im an Error ${err}`),
    //   () => console.log('finally Iam completed')
    // );
  }

  section2() {
    const observer = {
      next: val => console.log('next - 🚀', val),
      error: err => console.log('error - 🚨', err),
      complete: () => console.log('complete! - 👍')
    };
    // const source$ = from([11, 32, 53, 74, 35]);
    // source$.subscribe(observer);

    /**
     * Using the Iterator from JS Generator function
     */
    console.log(iterator.next().value);
    console.log(iterator.next().value);

    /**
     * Using the Rx JS Iterator
     */
    const source$ = from(iterator);
    source$.subscribe(observer);
  }

  section3() {
    // const timer$ = interval(1000);
    const timer$ = timer(2000, 1000);
    timer$.subscribe(console.log);
  }

  section4() {
    // of(1,2,3,4,5)
    //   .pipe(
    //     map(val => val*10),
    //   )
    //   .subscribe(console.log);
      const keyup$ = fromEvent(document, 'keyup');
      const keycodepluck$ = keyup$
        .pipe(
          pluck('code')
        );
      const pressed$ = keyup$
        .pipe(
          mapTo('kind of hard coded')
        );
      // keycodepluck$.subscribe(console.log)
      pressed$.subscribe(console.log);
  }

  test() {
    // of('Hope').subscribe(console.log);
    // from('Success').subscribe(console.log);
    //
    of(fetch('https://api.github.com/users/octocat')).subscribe(console.log);
    from(fetch('https://api.github.com/users/octocat')).subscribe(console.log);
    // of(1, 2, 3 , 4).pipe(
    //   map(val => val * 10)
    // ).subscribe(console.log);
    // //
    // from([1, 2, 3 , 4]).pipe(
    //   map(val => val * 10)
    // ).subscribe(console.log);
  }

  practiceReduce() {
    const numbers = [1, 2, 3, 4, 5];
    const consolidated = numbers.reduce((accumulator, currentValue) => accumulator + currentValue);
    console.log('Acc', consolidated);
    // * Reduce
    from(numbers)
      .pipe(
        reduce((accumulator, currentValue) => accumulator + currentValue)
      )
      .subscribe(val => console.log(`Rx Reduce - ${val}`));
    // * Scan
    from(numbers)
      .pipe(
        scan((accumulator, currentValue) => accumulator + currentValue)
      )
      .subscribe(val => console.log(`Rx Scan - ${val}`));
  }

  countDownTimer(startsFrom) {
    interval(1000)
      .pipe(
        mapTo(-1),
        scan((accumulator, currentValue) => accumulator + currentValue, startsFrom),
        tap(val => console.log(`Frm Tap ${val}`)),
        // filter(val => val >= 0)
        takeWhile(val => val >= 0)
      )
      .subscribe(val => console.log(`After Subscribe ${val}`));
  }

  practiseTake() {
    const numbers$ = of(20, 21, 22 , 23, 42 , 25, 26);
    const clickz$ = fromEvent<MouseEvent>(document, 'click');
    clickz$
      .pipe(
        map(evt => ({x: evt.clientX, y: evt.clientY})),
        // take(1),
        first(({y}) => y > 200)
      )
      .subscribe({
        next: console.log,
        complete: () => console.log('Completion of Evt!')
      });

    // * basic
    numbers$
      .pipe(take(3))
      .subscribe({
        // next: (val) => console.log(val),
        next: console.log,
        complete: () => console.log('Complete!')
      });
  }

  practiseTakeWhile() {
    const clickz$ = fromEvent<MouseEvent>(document, 'click');
    clickz$
      .pipe(
        map(evt => ({x: evt.clientX, y: evt.clientY})),
        takeWhile(({y}) => y <= 200)
      )
      .subscribe({
        next: console.log,
        complete: () => console.log('℞ 🎬While Completeed ')
      });
  }

  practiseTakeUntil() {
    // * takeUntil - Takes value until another observable emits a value.
    const counter$ = interval(1000);
    const clickz$ = fromEvent(document, 'click');
    counter$
      .pipe(
        takeUntil(clickz$)
      )
      .subscribe({
        next: console.log,
        complete: () => console.log('takeWhile completed')
      });
  }

  practiseDistinctUntilChanged() {
    const numbers$ = of(1, 1, 2, 3, 3, 3, 4, 5);
    numbers$
      .pipe(distinctUntilChanged())
      // * Duplicate values which appear in a row are removed & leaving only one occurence of each of our numbers
      .subscribe(val => console.log(`In a series occurence ${val}`));
    //
    const challenges$ = of(1, 1, 2, 3, 3, 3, 4, 5, 1, 3);
    challenges$
      .pipe(distinctUntilChanged())
      // * now it will repeat 1, 3
      .subscribe(val => console.log(`NOT In a series occurence ${val}`));
    //
    const user = [
      { name: 'Brian', loggedIn: false, token: null },
      { name: 'Brian', loggedIn: true, token: 'abc' },
      { name: 'Lara', loggedIn: true, token: 'xyz' },
      { name: 'Brian', loggedIn: true, token: '123' }
    ];

    from(user)
      .pipe(
        distinctUntilKeyChanged('name'),
        // distinctUntilChanged((prev, curr) => prev.name === curr.name), // * when custom comparer needs we may use this
        map(val => val.name)
      )
      .subscribe(console.log);
  }

  // tslint:disable-next-line:adjacent-overload-signatures
  todo() {
    const movies = [
      {
        name: 'The Dark Knight',
        rating: 'PG-13',
        year: 2012,
        bestScene: {
          name: 'fight',
          location: 'sewer',
          sceneLength: 10,
          actors: ['Christian Bale', 'Tom Hardy'
          ]
        }
      },
      {
        name: 'Good Burger',
        rating: 'PG',
        year: 1994,
        bestScene: {
          name: 'jump',
          location: 'giant milkshake',
          sceneLength: 5,
          actors: ['Kenan Thompson', 'Kel Mitchell'
          ]
        }
      },
      {
        name: 'Sharknado 2: The Second One',
        rating: 'TV-14',
        year: 2013
      },
      {
        name: 'The Big Short',
        rating: 'R',
        year: 2015,
        bestScene: {
          name: 'explanation',
          location: 'casino',
          sceneLength: 20,
          actors: ['Christian Bale', 'Steve Carrell'
          ]
        }
      }
    ];
    let consolidatedActors = [];
    movies.forEach(mov => {
      if (mov && mov.bestScene && mov.bestScene.actors) {
        consolidatedActors = [...consolidatedActors, ...mov.bestScene.actors];
      }
    });
    const uniqueActors = [...new Set(consolidatedActors)];
    console.log(uniqueActors);
  }

  chuteLadders() {

    let currentPosition = 0;

    const chuteVal = this.actionChute(47);

    // Ladders:
    // 1 - 38   = 37
    // 4 - 14 = 10
    // 9 - 31 = 22
    // 21 - 42 = 21
    // 28 - 84 = 56
    // 36 - 44 = 8
    // 51 - 67 = 16
    // 71 - 91 = 20
    // 80 - 100 = 20




    // Chutes: =
    // 17 - 6
    // 47 - 26
    // 49 - 11
    // 56 - 53
    // 62 - 19
    // 64 - 60
    // 87 - 24
    // 93 - 73
    // 95 -75
    // 98 - 78
  }

  player1Roll() {
    const player1 = this.player1Factory();
    const playerDiceValue = this.getRandomDiceNumber();
    const goto = player1(playerDiceValue);
  }

  player1Factory() {
    const chutes = {
      17: 6,
      47: 26,
      49: 11,
      56: 53,
      62: 19,
      64: 60,
      87: 24,
      93: 73,
      95: 75,
      98: 78
    };
    const ladders = {
      1: 38,
      4: 14,
      9: 31,
      21: 42,
      28: 84,
      36: 44,
      51: 67,
      71: 91,
      80: 100
    };
    return (diceVal) => {
      const total = diceVal + this.player1Poistion;
      if (chutes[total]) {
        return chutes[total];
      } else if (ladders[total]) {
        return ladders[total];
      }
      return total;
    };
  }

  private getRandomDiceNumber() {
    const diceRoll = Math.floor( Math.random() * 6 ) + 1;
    return diceRoll;
  }

  private actionChute(currentPosition) {
    const chutes = {
      17: 6,
      47: 26,
      49: 11,
      56: 53,
      62: 19,
      64: 60,
      87: 24,
      93: 73,
      95: 75,
      98: 78
    };
    if (chutes[currentPosition]) {
      return chutes[currentPosition];
    }
    return currentPosition;
  }
}
