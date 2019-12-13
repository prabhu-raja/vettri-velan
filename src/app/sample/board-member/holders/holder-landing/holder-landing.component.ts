import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-holder-landing',
  templateUrl: './holder-landing.component.html',
  styleUrls: ['./holder-landing.component.scss']
})
export class HolderLandingComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backToSample() {
    this.router.navigateByUrl('/sample');
  }
}
