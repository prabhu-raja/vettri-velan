import { Component, OnInit } from '@angular/core';
import { Subject, interval, Observable, BehaviorSubject } from 'rxjs';
import { tap, share, take, multicast, refCount, withLatestFrom } from 'rxjs/operators';
import { MulticastOperator } from 'rxjs/internal/operators/multicast';

@Component({
  selector: 'app-rx-subject',
  templateUrl: './rx-subject.component.html',
  styleUrls: ['./rx-subject.component.scss']
})
export class RxSubjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.kickStart();
    // this.beforeMulticast();
    // this.afterMulticast();
    // this.normalSubject();
    this.normalBehaviorSubject();
  }

  kickStart() {
    const observer = {
      next: (val) => console.log('next', val),
      error: (err) => console.log(err),
      complete: () => console.log('')
    };
    const observer2 = {
      next: (val) => console.log('next2', val),
      error: (err) => console.log(err),
      complete: () => console.log('')
    };
    //
    const subject = new Subject();
    const subscription = subject.subscribe(observer);
    subject.next('Hello World🌎');
    const subscriptionTwo = subject.subscribe(observer);
    subject.next('Hello Canada 🇨🇦');
    //
    const interval$ = interval(1000).pipe(take(5), tap(val => console.log('interval', val)));
    // interval$.subscribe(observer);
    // interval$.subscribe(observer);
    /*
    output for above 2 observers in each stream: (Here interval emits at each subscribe)
    interval 0
    next 0
    interval 0
    next 0
    interval 1
    next 1
    interval 1
    next 1
    */
    interval$.subscribe(subject);
    /*
    output for above subscribe subject. (Here interval emits only one time)
    interval 0
    next 0
    next 0
    interval 1
    next 1
    next 1
    */
  }

  beforeMulticast() {
    const observer = {
      next: val => console.log('next', val),
      error: err => console.log('err', err),
      complete: () => console.log('complete')
    };
    const subject = new Subject();
    const interval$ = interval(1500).pipe(
      take(10),
      tap(val => console.log('interval', val)),
    );

    interval$.subscribe(subject);
    const subOne = subject.subscribe(observer);
    const subTwo = subject.subscribe(observer);
  }

  afterMulticast() {
    const observer = {
      next: val => console.log('next', val),
      error: err => console.log('err', err),
      complete: () => console.log('complete')
    };
    const interval$ = interval(1000).pipe(
      take(10),
      tap(val => console.log('interval', val)),
      share()
    );
    const subOne = interval$.subscribe(observer);
    const subTwo = interval$.subscribe(observer);

    setTimeout(() => {
      // another way of unsubscribed
      subOne.unsubscribe();
      subTwo.unsubscribe();
    }, 4000);
  }

  normalSubject() {
    const observer = {
      next: val => console.log('next: ', val),
      error: err => console.log('error: ', err),
      complete: () => console.log('complete')
    };
    const subject = new Subject();
    //
    const oneSub = subject.subscribe(val => console.log('oneSub', val));
    subject.next('Hello');
    const twoSub = subject.subscribe(val => console.log('twoSub', val));
    subject.next('World');
    /*
    Output:
    oneSub Hello
    oneSub World
    twoSub World
    */
  }

  /*
   ! Main Diff b/w Subject and BehaviorSubject
   ! In BehaviorSubject we can receive last emit value or/and if we want emit initial seed value
  */

  normalBehaviorSubject() {
    const bs = new BehaviorSubject('Hi');
    //
    bs.next('111');
    bs.next('222');
    const oneSub = bs.subscribe(val => console.log('oneBS', val));
    bs.next('Hello');
    bs.next('Hello🇨🇦🇨🇦🇨🇦🇨🇦');
    bs.next('Hello 🇩🇪🇩🇪🇩🇪🇩🇪');
    const twoSub = bs.subscribe(val => console.log('twoBS', val));
    bs.next('World');
    /*
    Output:
    oneBS 222
    oneBS Hello
    oneBS Hello🇨🇦🇨🇦🇨🇦🇨🇦
    oneBS Hello 🇩🇪🇩🇪🇩🇪🇩🇪
    twoBS Hello 🇩🇪🇩🇪🇩🇪🇩🇪
    oneBS World
    twoBS World
    */
  }

}
