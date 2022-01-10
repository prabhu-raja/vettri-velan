import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

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

}
