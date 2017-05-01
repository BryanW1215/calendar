import { SessionService } from '../services/session.service';

const INITIAL_STATE: any = {isLoggedIn: false, user: null};

export function sessionReducer(state: any = INITIAL_STATE, action:any): any {
  switch (action.type) {
    case SessionService.SESSION_LOGIN:
      return {isLoggedIn: true, user: action.payload};

    case SessionService.SESSION_UPDATE_PHOTO:
      return {...state, user: {...state.user, picture: action.payload}};

    case SessionService.SESSION_LOGOUT:
      return {isLoggedIn: false, user: null};

    default:
      return state;
  }
}
