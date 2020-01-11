import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, of, fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
  map,
  debounceTime,
  mergeAll,
  tap,
  mergeMap,
  takeWhile,
  takeUntil,
  switchMap,
  pluck,
  distinctUntilChanged,
  concatMap,
  take,
  delay } from 'rxjs/operators';

@Component({
  selector: 'app-rx-transformation',
  templateUrl: './rx-transformation.component.html',
  styleUrls: ['./rx-transformation.component.scss']
})
export class RxTransformationComponent implements OnInit, OnDestroy {
  alive = true;
  globalMsg: string;
  // isConcatMap = false;
  BASE_URL = 'https://api.openbrewerydb.org/breweries';
  constructor() { }

  ngOnInit() {
    // this.practiseMergeAll();
    // this.mergeAllToMergeMap();
    // this.practiseMergeMap1();
    // this.practiseMergeMap2();
    // this.practiseInitSwitchMap();
    // this.practiseSwitchMap();
    // this.playConcatMap();
    this.practiseConcatMap();
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

  practiseInitSwitchMap() {
    const clickz$ = fromEvent(document, 'click');
    const interval$ = interval(800);
    clickz$
      .pipe(
        // mergeMap(() => interval$)
        // * When using mergeMap it keeps the previous observable
        switchMap(() => interval$)
        // * but switchMap-> switches to new observable on emissions from source & cancelling previously active inner observable
      )
      .subscribe(console.log);
  }

  practiseSwitchMap() {
    this.globalMsg = 'Switch Map with debounce';
    const textInput = document.getElementById('text-input');
    const input$ = fromEvent<any>(textInput, 'keyup');
    const typeaheadContainer = document.getElementById('input-container');

    input$
      .pipe(
        debounceTime(200),
        pluck('target', 'value'),
        distinctUntilChanged(),
        switchMap(val => {
          return ajax.getJSON(`${this.BASE_URL}?by_name=${val}`);
        }),
        tap(val => console.log('Aftr switch', val))
      )
      .subscribe((resp: any[]) => {
        typeaheadContainer.innerHTML = resp.map(brew => brew.name).join('<br>');
      });
  }

  playConcatMap() {
    // this is like a queue. If you click 5 times it results 012,012,012,012,012
    const clickz$ = fromEvent(document, 'click');
    const interval$ = interval(800);
    clickz$
      .pipe(
        concatMap(() => interval$.pipe(take(2)))
      )
      .subscribe(console.log);
  }

  practiseConcatMap() {
    // this.isConcatMap = true;

    const saveAnswer = (answer) => {
      return of(`Saved answers: ${answer}`).pipe(delay(1500));
    };
    // elements
    const radioButtons = document.querySelectorAll('.radio-option');
    // streams
    fromEvent<any>(radioButtons, 'click')
      .pipe(
        concatMap(evt => saveAnswer(evt.target.value))
      )
      .subscribe(console.log);
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
