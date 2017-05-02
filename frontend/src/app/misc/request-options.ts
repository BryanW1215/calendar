import {RequestOptions, RequestOptionsArgs, Headers, BaseRequestOptions} from "@angular/http";
import {NgRedux} from 'ng2-redux';
import {IAppState} from "../store/index";
import {Injectable, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

@Injectable()
export class AuthorizationRequestOptions extends RequestOptions implements OnDestroy {

  private sessionSubscription: Subscription;

  constructor(private NgRedux: NgRedux<IAppState>) {
    super();
    this.headers = this.headers || new Headers;

    this.sessionSubscription = this.NgRedux.select(state => state.session).subscribe(session => {
      this.headers.has("account-id") && this.headers.delete("account-id");
      this.headers.has("token") && this.headers.delete("token");
      if (!session.isLoggedIn) {
        return;
      }
      this.headers.append('account-id', session.user.id);
      this.headers.append('token', session.user.token);
    });
  }

  ngOnDestroy() {
    this.sessionSubscription && this.sessionSubscription.unsubscribe();
  }

}
