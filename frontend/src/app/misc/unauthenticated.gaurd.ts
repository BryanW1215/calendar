import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { NgRedux } from 'ng2-redux';
import {Subscription} from "rxjs";
@Injectable()
export class UnauthenticatedRouteGaurd implements CanActivate {
  sessionSubscription :Subscription;
  isLoggedIn :boolean;
  constructor(private ngRedux: NgRedux<any>, private router: Router) {
    this.sessionSubscription = this.ngRedux.select(state=>state.session.isLoggedIn).subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn
    });
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    if(!this.isLoggedIn){
      return true;
    }
    this.router.navigate(["/"]);
    return false;
  }

}
