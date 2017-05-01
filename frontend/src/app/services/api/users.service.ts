import { Injectable } from '@angular/core';
import BaseAPIService from './base.service';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";


@Injectable()
export class UsersService extends BaseAPIService {
  constructor(http: Http) {
    super(http, 'users');
  }
}
