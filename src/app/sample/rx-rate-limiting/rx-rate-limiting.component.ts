import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, pluck, distinctUntilChanged } from 'rxjs/operators';

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
    // elements
    const inputBox = document.getElementById('text-input');
    // streams
    const input$ = fromEvent(inputBox, 'keyup');
    input$
      .pipe(
        debounceTime(1000),
        pluck('target', 'value'),
        distinctUntilChanged()
      )
      .subscribe(console.log);

  }

}
