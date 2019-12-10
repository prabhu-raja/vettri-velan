import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-scroll-bar',
  templateUrl: './scroll-bar.component.html',
  styleUrls: ['./scroll-bar.component.scss']
})
export class ScrollBarComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const progressBar = document.querySelector('.progress-bar') as HTMLElement;
    const scroll$ = fromEvent(document, 'scroll');
    const progress$ = scroll$.pipe(
      map(({target}) => this.calculateScrollPercent(target))
    );
    progress$.subscribe(percent => {
      progressBar.style.width = `${percent}%`;
    });
  }

  calculateScrollPercent(elmt) {
    const {
      clientHeight,
      scrollTop,
      scrollHeight
    } = elmt.scrollingElement;
    return (scrollTop / ( scrollHeight - clientHeight)) * 100;
  }
}
