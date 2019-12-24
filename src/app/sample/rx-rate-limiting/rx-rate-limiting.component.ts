import { Component, OnInit } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { debounceTime, pluck, distinctUntilChanged, debounce } from 'rxjs/operators';

@Component({
  selector: 'app-rx-rate-limiting',
  templateUrl: './rx-rate-limiting.component.html',
  styleUrls: ['./rx-rate-limiting.component.scss']
})
export class RxRateLimitingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.practiseDebounce();
  }

  practiseDebounce() {
    // declarations
    const waitingSec = 1000;
    // elements
    const inputBox = document.getElementById('text-input');
    // streams
    const input$ = fromEvent(inputBox, 'keyup');
    input$
      .pipe(
        // debounceTime(1000),
        debounce(() => interval(waitingSec)),
        pluck('target', 'value'),
        distinctUntilChanged()
      )
      .subscribe(console.log);

  }

}
