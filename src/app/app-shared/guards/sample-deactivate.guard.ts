import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { HolderLandingComponent } from 'src/app/sample/board-member/holders/holder-landing/holder-landing.component';

@Injectable({
  providedIn: 'root'
})
export class SampleDeactivateGuard implements CanDeactivate<HolderLandingComponent> {
  canDeactivate(
    component: HolderLandingComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {
      return window.confirm('Are you wanna leave???');
  }
}
