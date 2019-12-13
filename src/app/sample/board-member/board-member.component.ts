import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-member',
  templateUrl: './board-member.component.html',
  styleUrls: ['./board-member.component.scss']
})
export class BoardMemberComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  gotoSampleLanding() {
    this.router.navigateByUrl('/sample');
  }

}
