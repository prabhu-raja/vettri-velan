import { Component, OnInit } from '@angular/core';
import { from, fromEvent, Observable, Observer, of, range } from 'rxjs';
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
    this.operatorFrom();
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

}
