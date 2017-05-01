import {Injectable} from '@angular/core';
import {Request, XHRBackend, RequestOptions, Response, Http, RequestOptionsArgs, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Router} from "@angular/router";
import {NgRedux} from 'ng2-redux';
import {IAppState} from '../store';
import {SessionService} from './session.service';

import * as _ from 'lodash';
import {ErrorService} from "./error.service";
@Injectable()
export class AuthenticatedHttpService extends Http {

  constructor(backend: XHRBackend, defaultOptions: RequestOptions, private Router: Router, private ngRedux: NgRedux<IAppState>, private error: ErrorService) {
    super(backend, defaultOptions);
  }

  file(url: string, fileList: any): Observable<any> {
    if (!fileList.length) {
      return Observable.of({success: false, error: {code: 1, message: 'Invalid request'}});
    }

    let file: File = fileList[0];
    let formData: FormData = new FormData();
    _.each(fileList, (file, index) => {
      formData.append(`file${index}`, file, file.name)
    });

    let options = new RequestOptions(this._defaultOptions);
    options.headers.append('enctype', 'multipart/form-data');
    options.headers.append('Accept', 'application/json');
    return this.post(url, formData, options);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {
    let ignoreError = false;
    return super.request(url, options)
      .map(res => {
        ignoreError = false;
        let result = res.json();
        if(!result.success){
          this.error.notify(result.error);
          ignoreError = true;
          throw result.error;
        }
        return result.data;
      })
      .catch((error: Response) => {
        if (error.status === 401 || error.status === 403) {
          this.ngRedux.dispatch({type: SessionService.SESSION_LOGOUT});
          return this.Router.navigate(['/signon']);
        }
        let err = error.json ? error.json().error : error;
        if(!ignoreError) {
          this.error.notify(err);
        }
        throw err;
      })

  }
}
