import { Component, OnInit } from '@angular/core';
import { from, fromEvent, interval, Observable, Observer, of, range, timer } from 'rxjs';
import { filter, map, mapTo, pluck, reduce, scan, take, tap } from 'rxjs/operators';
import { iterator } from '../../app.service';
@Component({
  selector: 'app-do-it',
  templateUrl: './do-it.component.html',
  styleUrls: ['./do-it.component.scss']
})
export class DoItComponent implements OnInit {

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
    this.countDownTimer();

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
    /**
     * Filtering Operator Ends
     */
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

  transformationScan() {
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

  private countDownTimer() {
    interval(1000)
      .pipe(
        mapTo(-1),
        scan((accumulator, currentValue) => {
          console.log(`accumulator  ${accumulator} | currentValue  ${currentValue}`);
          return accumulator + currentValue;
        }, 10),
        tap(val => console.log(`Before filter ${val}`)),
        filter(val => val >= 0),
      )
      .subscribe(val => console.log(`countdown ${val}`));
  }

}
