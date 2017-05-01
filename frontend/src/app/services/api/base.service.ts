import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import * as _ from 'lodash';
import {ErrorService} from "../error.service";


export default class BaseAPIService {
  protected serviceUrl: string;


  constructor(protected http: Http, private collection: string) {
    this.serviceUrl = environment.apiUrl + 'api/' + collection + '/';
  }

  getAll(include: string = ''): Observable<any> {
    return this.http.get(this.serviceUrl)
  }
  getById(id: number, include = ''): Observable<any>{
    if(id === environment.blankId){
      return Observable.of({id: environment.blankId});
    }
    let url = this.serviceUrl + id + '?include=' + include;
    return this.http.get(url)
  }

  create(entity: any): Observable<any> {
    return this.http.post(this.serviceUrl, entity);
  }

  update(entity: any): Observable<any> {
    let url = this.serviceUrl + entity.id;
    return this.http.put(url, entity);
  }
  save(entity: any): Observable<any> {
    if(entity.id === environment.blankId){
      return this.create(entity);
    }
    return this.update(entity);
  }
  delete(parameter: any): Observable<any> {
    let url = this.serviceUrl + (_.isObject(parameter) ? parameter.id : parameter);
    return this.http.delete(url);
  }
}
