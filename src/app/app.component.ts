import { Component, OnInit } from '@angular/core';
import { Observable, of, range, from, interval, timer, fromEvent } from 'rxjs';
import { iterator } from './app.service';
import { map, tap, pluck, mapTo } from 'rxjs/operators';

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
    this.section4();
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
      pressed$.subscribe(console.log)
  }
}
