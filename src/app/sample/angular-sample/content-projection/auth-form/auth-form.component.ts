import { Component, OnInit, ContentChild, AfterContentInit, OnDestroy, ElementRef } from '@angular/core';
import { AuthRememberComponent } from 'src/app/sample/angular-sample/content-projection/auth-remember/auth-remember.component';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit, AfterContentInit, OnDestroy {

  @ContentChild(AuthRememberComponent, { static: false}) authRemember: AuthRememberComponent;
  @ContentChild('processor', { static: false}) elmProcess: ElementRef;
  showMsg: boolean;
  alive = true;
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    // * After the ng-content initialized we can access the AuthRememberComponent
    if (this.authRemember) {
      this.authRemember.checked
        .pipe(
          takeWhile(() => this.alive)
        )
        .subscribe(val => this.showMsg = val);
    }
    //
    if (this.elmProcess) {
      this.elmProcess.nativeElement.innerHTML = 'Modified using Element Ref';
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
