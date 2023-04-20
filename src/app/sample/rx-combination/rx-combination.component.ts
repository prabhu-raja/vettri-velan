import { Component, OnInit } from '@angular/core';
import { fromEvent, combineLatest, interval } from 'rxjs';
import { map, tap, filter, withLatestFrom, scan, mapTo, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-rx-combination',
  templateUrl: './rx-combination.component.html',
  styleUrls: ['./rx-combination.component.scss']
})
export class RxCombinationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.playCombineLatest();
    // this.playWithLatestFrom();
    this.playCountDowntimer();
  }

  playCombineLatest() {
    // element refs
    const first = document.getElementById('first');
    const second = document.getElementById('second');

    // helper
    const keyupAsValue = elm => {
      return fromEvent<any>(elm, 'keyup')
        .pipe(
          map(evt => evt.target.value)
        );
    };

    combineLatest(
      keyupAsValue(first),
      keyupAsValue(second)
    )
    .pipe(
      filter(([one, two]) => {
        return !isNaN(one) && !isNaN(two);
      }),
      map(([one, two]) => {
        return parseInt(one, 10) + parseInt(two, 10);
      })
    )
    .subscribe(console.log);
  }

  playWithLatestFrom() {
    const click$ = fromEvent(document, 'click');
    click$
      .pipe(withLatestFrom(interval(1000)))
      .subscribe(console.log);
  }

  playCountDowntimer() {
    const counter$ = interval(1000);
    counter$
      .pipe(
        mapTo(-1),
        scan((accumulator, current) => {
          return accumulator + current;
        }, 10),
        tap(val => console.log('Before filter', val)),
        takeWhile(val => val >= 0)
        // filter(val => val >= 0),
      )
      .subscribe(res => console.log('countdown ⏱', res));
  }

}
