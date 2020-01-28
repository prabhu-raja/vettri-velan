import { Component, OnInit } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { tap, share, take } from 'rxjs/operators';

@Component({
  selector: 'app-rx-subject',
  templateUrl: './rx-subject.component.html',
  styleUrls: ['./rx-subject.component.scss']
})
export class RxSubjectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.kickStart();
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

}
