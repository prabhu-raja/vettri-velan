import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, fromEvent } from 'rxjs';
import { scan, mapTo, tap, filter, takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit, OnDestroy {

  alive = true;
  constructor() { }

  ngOnInit() {
    this.initTimer(10);
  }

  initTimer(startsFrom) {
    // * Element Refs
    const countdown = document.getElementById('countdown');
    const abortButton = document.getElementById('abort');

    // * Streams
    const counter$ = interval(1000);
    const abort$ = fromEvent(abortButton, 'click');

    counter$
      .pipe(
        mapTo(-1),
        scan((accumulator, currentValue) => accumulator + currentValue, startsFrom),
        tap(val => console.log(` Before ⏰ Tap ${val}`)),
        takeWhile(() => this.alive),
        takeUntil(abort$), // * takeUntil - Takes value until another observable emits a value.
        tap(val => console.log(` After ⏰ Tap ${val}`))
        // filter(val => val >= 0) // * If we use the filter time display will stop in 0 but behind the screen stream continues
      )
      .subscribe(val => countdown.innerHTML = val);
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
