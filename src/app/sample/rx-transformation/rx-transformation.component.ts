import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, debounceTime, mergeAll, tap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-rx-transformation',
  templateUrl: './rx-transformation.component.html',
  styleUrls: ['./rx-transformation.component.scss']
})
export class RxTransformationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     this.test();
  }

  test() {
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
}
