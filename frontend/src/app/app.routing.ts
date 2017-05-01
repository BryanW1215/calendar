import {Routes, RouterModule} from '@angular/router';

import {AuthenticatedRouteGaurd} from './misc/authenticated.gaurd';
import {UnauthenticatedRouteGaurd} from './misc/unauthenticated.gaurd';
import {AccountComponent} from './pages/account/account.component';
import {CalendarComponent} from './pages/calendar/calendar.component';
import {SignonComponent} from './pages/signon/signon.component';
import {UsersComponent} from './pages/users/users.component';
const APP_ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'calendar'},
  {path: 'account', component: AccountComponent, canActivate: [AuthenticatedRouteGaurd]},
  {path: 'users', component: UsersComponent, canActivate: [AuthenticatedRouteGaurd]},
  {path: 'calendar', component: CalendarComponent, canActivate: [AuthenticatedRouteGaurd]},
  {path: 'calendar/:id', component: CalendarComponent, canActivate: [AuthenticatedRouteGaurd]},
  {path: 'signon', component: SignonComponent, canActivate: [UnauthenticatedRouteGaurd]},
  {path: '**', redirectTo: '/calender'}
];
export const routing = RouterModule.forRoot(APP_ROUTES);
