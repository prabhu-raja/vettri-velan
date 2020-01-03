import { Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, debounceTime, mergeAll, tap, mergeMap, takeWhile, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-rx-transformation',
  templateUrl: './rx-transformation.component.html',
  styleUrls: ['./rx-transformation.component.scss']
})
export class RxTransformationComponent implements OnInit, OnDestroy {
  alive = true;
  globalMsg: string;
  constructor() { }

  ngOnInit() {
    // this.practiseMergeAll();
    // this.mergeAllToMergeMap();
    // this.practiseMergeMap1();
    this.practiseMergeMap2();
  }

  practiseMergeAll() {
    const textInput = document.getElementById('text-input');
    const input$ = fromEvent<any>(textInput, 'keyup');
    input$
      .pipe(
        debounceTime(900),
        map(evt => {
          const term = evt.target.value;
          return ajax.getJSON(`https://api.github.com/users/${term}`);
        }),
        tap(val => console.log('Before Merge All', val)),
        mergeAll()
      )
      .subscribe(console.log);
  }

  mergeAllToMergeMap() {
    const textInput = document.getElementById('text-input');
    const input$ = fromEvent<any>(textInput, 'keyup');
    input$
      .pipe(
        debounceTime(900),
        mergeMap(evt => {
          const term = evt.target.value;
          return ajax.getJSON(`https://api.github.com/users/${term}`);
        }),
        tap(val => console.log('🎅🏻', val))
      )
      .subscribe(console.log);
  }

  practiseMergeMap1() {
    const clickz$ = fromEvent(document, 'click');
    const interval$ = interval(1000);
    clickz$
      .pipe(
        mergeMap(() => interval$),
        takeWhile(() => this.alive)
      )
      .subscribe(console.log);
  }

  practiseMergeMap2() {
    this.globalMsg = 'Please do Mouse Click inside the textbox';
    const clickz$ = fromEvent(document, 'click');
    const textInput = document.getElementById('text-input');
    const input$ = fromEvent<any>(textInput, 'keyup');
    const interval$ = interval(1000);

    clickz$
      .pipe(
        tap(() => console.log('Before')),
        mergeMap(() =>
          interval$.pipe(takeUntil(input$))
        ),
        tap(() => console.log('After'))
      )
      .subscribe(val => console.log('This will stop on typing in textbox', val));
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
