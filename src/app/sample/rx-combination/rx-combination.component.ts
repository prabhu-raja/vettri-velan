import { Component, OnInit } from '@angular/core';
import { fromEvent, combineLatest } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rx-combination',
  templateUrl: './rx-combination.component.html',
  styleUrls: ['./rx-combination.component.scss']
})
export class RxCombinationComponent implements OnInit {

  constructor() { }



  ngOnInit() {
    this.playCombineLatest();
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

}
