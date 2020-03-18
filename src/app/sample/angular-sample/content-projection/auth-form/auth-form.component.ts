import {
  Component,
  OnInit,
  ContentChild,
  AfterContentInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { AuthRememberComponent } from 'src/app/sample/angular-sample/content-projection/auth-remember/auth-remember.component';
import { AuthMessageComponent } from 'src/app/sample/angular-sample/content-projection/auth-message/auth-message.component';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {

  @ContentChild(AuthRememberComponent, { static: false}) authRemember: AuthRememberComponent;
  @ContentChild('processor', { static: false}) elmProcess: ElementRef;
  @ViewChild(AuthMessageComponent, {static: true}) authMessage: AuthMessageComponent;
  showMsg: boolean;
  alive = true;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  ngAfterContentInit() {
    console.log(this.authMessage);
    if (this.authMessage) {
      this.authMessage.days = 30;
    }
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
