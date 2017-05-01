import {Injectable} from '@angular/core';
import BaseAPIService from './base.service';
import {ErrorService} from "../error.service";
import {Http} from "@angular/http";


@Injectable()
export class EventsService extends BaseAPIService {
  constructor(http: Http) {
    super(http, 'events');
  }
}
