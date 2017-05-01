import {Component, OnDestroy, OnInit} from '@angular/core';
import { NgRedux } from 'ng2-redux';
import {Observable, Subscription} from "rxjs";
import {UsersService} from "../../services/api/users.service";
import {SessionService} from '../../services/session.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnDestroy {

  public user: any;
  private sessionSubscription: Subscription;
  constructor(private ngRedux: NgRedux<any>, private userService: UsersService) {
    this.sessionSubscription = this.ngRedux.select(state=>state.session.user).subscribe(user => this.user = user)

  }
  public PictureUploaded =  (pictureUrl) =>
  {
    this.ngRedux.dispatch({type: SessionService.SESSION_UPDATE_PHOTO, payload: pictureUrl});
  };

  public ngOnDestroy(){
    this.sessionSubscription.unsubscribe();
  }
}
