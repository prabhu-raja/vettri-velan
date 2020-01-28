import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sample-board',
  templateUrl: './sample-board.component.html',
  styleUrls: ['./sample-board.component.scss']
})
export class SampleBoardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  displayHolders() {
    this.router.navigateByUrl('/sample/holders');
  }

  navtoMembers() {
    this.router.navigateByUrl('/sample/members');
  }

  navtoRxRateLimiting() {
    this.router.navigateByUrl('/sample/rate-limiting');
  }

  navtoRxTransformation() {
    this.router.navigateByUrl('/sample/transformation');
  }

  navtoRxCombination() {
    this.router.navigateByUrl('/sample/combination');
  }

  navtoMortgageCalculator() {
    this.router.navigateByUrl('/sample/mortgage');
  }

  navtoSubject() {
    this.router.navigateByUrl('/sample/subject');
  }

}
