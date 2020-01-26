import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MortgageService {

  constructor() { }

  calculateMortgage(interest, loanAmount, loanLength): string {
    const calculatedInterest = interest / 1200;
    const total = (loanAmount * calculatedInterest) / (1 - Math.pow(1 / (1 + calculatedInterest), loanLength));
    return total.toFixed(2);
  }
}
