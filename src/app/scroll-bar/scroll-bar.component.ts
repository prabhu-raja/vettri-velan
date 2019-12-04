import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-scroll-bar',
  templateUrl: './scroll-bar.component.html',
  styleUrls: ['./scroll-bar.component.scss']
})
export class ScrollBarComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const scroll$ = fromEvent(document, 'scroll');
    scroll$.subscribe(console.log);
  }
}
