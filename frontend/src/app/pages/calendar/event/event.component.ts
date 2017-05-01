import {AfterViewChecked, AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from "rxjs/Subscription";
import * as moment from 'moment';
import {EventsService} from "../../../services/api/eventsService";
import {IAppState} from "../../../store/index";
import {NgRedux} from "ng2-redux";
import {environment} from 'environments/environment';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy{
  @Input('data') event: any;
  @Input('on-update') onUpdate: Function;
  @ViewChild('form') form: NgForm;

  private isValid: boolean = false;
  private formSubscription: Subscription;
  constructor(private ngRedux:NgRedux<IAppState>, private eventsService: EventsService) { }

  ngOnInit(){
    this.formSubscription = this.form.valueChanges.subscribe((data) => this.checkValidity(data));

  }
  ngOnDestroy(){
    this.formSubscription.unsubscribe();
  }
  checkValidity(data){
    this.isValid = this.form.valid;
    if(!this.isValid){
      return;
    }
    this.isValid = this.isValid && moment(data.start) <= moment(data.end);
  }
  Save() {
    if(!this.isValid){
      return;
    }
    this.event.user_id = this.ngRedux.getState().session.user.id;
    this.eventsService.save(this.event).subscribe((event)=>this.onUpdate(event));
  }
  Close() {
    this.onUpdate('close');
  }
  Delete() {
    if(this.event.id === environment.blankId){
      return;
    }
    this.eventsService.delete(this.event).subscribe((event)=>this.onUpdate());
  }

}
