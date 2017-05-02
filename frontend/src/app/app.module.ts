import {BrowserModule} from '@angular/platform-browser';
import {ChangeDetectorRef, Inject, NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, RequestOptions, Http} from '@angular/http';

import {NgReduxModule, NgRedux} from 'ng2-redux';
import persistState from 'redux-localstorage';

import {rootReducer, IAppState} from './store';
import {AuthorizationRequestOptions} from './misc/request-options';
import {routing} from './app.routing';
import {AuthenticatedRouteGaurd} from './misc/authenticated.gaurd';
import {UnauthenticatedRouteGaurd} from './misc/unauthenticated.gaurd';

import {SessionService} from './services/session.service';
import {ErrorService} from './services/error.service';


import {AuthenticatedHttpService} from './services/authenticated.http.service';

import {AppComponent} from './app.component';

import {SignonComponent} from './pages/signon/signon.component';
import {UsersComponent} from './pages/users/users.component';
import {CalendarComponent} from './pages/calendar/calendar.component';
import {AccountComponent} from './pages/account/account.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {UsersService} from "./services/api/users.service";
import {EventsService} from "./services/api/eventsService";
import {FileuploadDirective} from './shared/fileupload/fileupload.directive';
import {ToastyModule} from 'ng2-toasty';
import {NKDatetimeModule} from 'ng2-datetime/ng2-datetime';
import { EventComponent } from './pages/calendar/event/event.component';
@NgModule({
  declarations: [
    AppComponent,
    FileuploadDirective,
    SignonComponent,
    UsersComponent,
    CalendarComponent,
    AccountComponent,
    NavbarComponent,
    FileuploadDirective,
    EventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    routing,
    ToastyModule.forRoot(),
    NKDatetimeModule

  ],
  providers: [SessionService, AuthenticatedRouteGaurd, UnauthenticatedRouteGaurd, ErrorService, AuthenticatedHttpService,
    UsersService, EventsService,
    {provide: RequestOptions, useClass: AuthorizationRequestOptions},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: Http, useClass: AuthenticatedHttpService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, {}, [], [persistState('session')]);
  }
}
