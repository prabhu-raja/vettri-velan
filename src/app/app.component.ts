import { Component, OnInit } from '@angular/core';
import { Observable, of, range, from, interval, timer, fromEvent } from 'rxjs';
import { iterator } from './app.service';
import { map, tap, pluck, mapTo, reduce, scan, filter, take, first, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vettri-velan';

  ngOnInit(): void {
    // this.section1();
    // this.section2();
    // this.section3();
    // this.section4();
    // this.test();
    // this.practiceReduce();
    this.countDownTimer(10);
    // this.practiseTake();
    // this.practiseTakeWhile();
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
}
