import { Component, OnInit } from '@angular/core';
import { MortgageService } from 'src/app/app-shared/services/mortgage.service';
import { fromEvent, of, combineLatest } from 'rxjs';
import { map, delay, filter, tap, mergeMap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-mortgage-calculator',
  templateUrl: './mortgage-calculator.component.html',
  styleUrls: ['./mortgage-calculator.component.scss']
})
export class MortgageCalculatorComponent implements OnInit {

  constructor(private mortgageService: MortgageService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    // elements
    const loanAmount = document.getElementById('loanAmount');
    const interest = document.getElementById('interest');
    const loanLength = document.querySelectorAll('.loanLength');
    const expected = document.getElementById('expected');

    // helpers
    const createInputValueStream = (elem) => {
      return fromEvent<any>(elem, 'input')
        .pipe(
          map(evt => parseFloat(evt.target.value))
        );
    };

    // simulating a save request
    const saveRespone = mortgageAmount => of(mortgageAmount).pipe(delay(1000));

    // streams
    const loanAmount$ = createInputValueStream(loanAmount);
    const interest$ = createInputValueStream(interest);
    const loanLength$ = createInputValueStream(loanLength);

    combineLatest(
      loanAmount$,
      interest$,
      loanLength$
    )
    .pipe(
      tap(console.log),
      map(([loanAmountVal, interestVal, loanMonthsVal]) => {
        return this.mortgageService.calculateMortgage(interestVal, loanAmountVal, loanMonthsVal);
      }),
      filter((mortgageAmount: any) => !isNaN(mortgageAmount)),
      switchMap(mortgageAmount => saveRespone(mortgageAmount)),
    )
    .subscribe(mortgageAmount => {
      expected.innerHTML = mortgageAmount;
    });
  }

}
