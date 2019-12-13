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

  gotoMembers() {
    this.router.navigateByUrl('/sample/members');
  }

}
