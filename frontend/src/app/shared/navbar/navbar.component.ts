import {Component, OnDestroy} from '@angular/core';
import {NgRedux} from 'ng2-redux';
import {Subscription} from "rxjs";
import {getTimeofDay} from '../../misc/misc';
import {SessionService} from "../../services/session.service";
declare const gapi: any;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {

  public session: any;
  public greeting: string;
  public isLoggedIn: boolean;
  private sessionSubscription: Subscription;

  constructor(private ngRedux: NgRedux<any>, private sessionService: SessionService) {
    this.sessionSubscription = this.ngRedux.select(state => state.session).subscribe(session => {
      this.isLoggedIn = session.isLoggedIn;
      this.session = session;
      this.session.isLoggedIn && (this.greeting = `Good ${getTimeofDay()}, ${this.session.user.first_name}`);
    });
  }

  public ngOnDestroy() {
    this.sessionSubscription.unsubscribe();
  }

  public Login = () => this.sessionService.Login();
  public Logout = () => this.sessionService.Logout();


}
