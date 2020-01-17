import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, fromEvent, merge, EMPTY } from 'rxjs';
import {
  scan,
  mapTo,
  tap,
  filter,
  takeUntil,
  takeWhile,
  startWith,
  switchMap
} from 'rxjs/operators';

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
    // ? Element Refs
    const countdown = document.getElementById('countdown');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');

    // ? Streams
    const counter$ = interval(1000);
    const startClick$ = fromEvent(startButton, 'click');
    const pauseClick$ = fromEvent(pauseButton, 'click');
    merge(
      startClick$.pipe(mapTo(true)),
      pauseClick$.pipe(mapTo(false))
    )
    .pipe(
      switchMap(shouldStart => shouldStart ? counter$ : EMPTY),
      mapTo(-1),
      scan((accumulator, currentValue) => accumulator + currentValue, startsFrom),
      takeWhile(() => this.alive),
      takeWhile(val => val >= 0),
      // takeUntil(pauseClick$), // ? takeUntil - Takes value until another observable emits a value.
      startWith(10),
      tap(val => console.log(` After ⏰ Tap ${val}`))
      // filter(val => val >= 0) // ? If we use the filter time display will stop in 0 but behind the screen stream continues
    )
    .subscribe(val => countdown.innerHTML = val);
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
