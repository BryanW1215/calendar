import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import calendarOptions from './calendar.options';
import * as _ from 'lodash';
import * as moment from 'moment';
import {environment} from 'environments/environment';
import {EventsService} from "../../services/api/eventsService";
import {IAppState} from "../../store/index";
import {NgRedux} from "ng2-redux";
import {UsersService} from "app/services/api/users.service";
declare const $: any;


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit, OnInit {

  public eventData: any;
  public calEvent: any;
  public user: any;
  private calendar: any;

  constructor(private elemRef: ElementRef, private ngRedux: NgRedux<IAppState>, private usersService: UsersService, private cdrRef: ChangeDetectorRef) {
    this.AddEvent = this.AddEvent.bind(this);
    this.onEventSelected = this.onEventSelected.bind(this);
    this.onEventUpdate = this.onEventUpdate.bind(this);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let options = _.cloneDeep(calendarOptions);
    let events = {
      eventClick: this.onEventSelected
    };
    _.assignIn(options, events);
    let elem = $(this.elemRef.nativeElement).find('.full-calendar').first();
    this.calendar = elem.fullCalendar.bind(elem);
    this.calendar(options);
    let userId = this.ngRedux.getState().session.user.id;
    this.usersService.getById(userId, 'events').subscribe(user => {
      this.calendar('renderEvents', user.events);
      this.user = user;
      delete this.user.events;
    })
  }

  public AddEvent()  {
    this.eventData = {id: environment.blankId, isNew: true};
    this.calEvent = null;
    this.cdrRef.detectChanges();
  };

  public onEventUpdate(event) {
    this.eventData = null;
    let calEvent = this.calEvent;
    this.calEvent = null;
    this.cdrRef.detectChanges();
    if (event === 'close') {
      return;
    }
    if (!event && calEvent) {
      return this.calendar('removeEvents', [calEvent._id]);
    }
    if (!calEvent) {
      return this.calendar('renderEvent', event);
    }
    _.assignIn(calEvent, event, {start: moment(event.start), end: moment(event.end)});
    this.calendar('updateEvent', calEvent);

  };

  public onEventSelected(event)  {
    this.calEvent = event;
    this.eventData = {id: event.id, title: event.title, start: event.start.toDate(), end: event.end.toDate()};
    this.cdrRef.detectChanges();
  }
}
