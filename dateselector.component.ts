import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';


import * as _moment from 'moment';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatDatepickerInputEvent } from '@angular/material';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMMM',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-dateselector',
  templateUrl: './dateselector.component.html',
  styleUrls: ['./dateselector.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class DateselectorComponent implements OnInit {
  @Output() dateSelected = new EventEmitter();
  style = { block: "nearest", behavior: "smooth", inline: "start"}
  // exteranl parent component should pass this data from outside
  days;
  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  weeks = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  selectedId;
  startDate = _moment();

  constructor() { }

  ngOnInit() {
    this.days = this.getDaysInMonth(new Date().getFullYear(),new Date().getMonth())
    this.onDateClicked(new Date().getDate());
  }

  //generate days from month
  getDaysInMonth(year, month) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  scrollInto(event) {
    var selectedDate = new Date(event.value);
    this.days = this.getDaysInMonth(selectedDate.getFullYear(),selectedDate.getMonth());
    document.getElementById(selectedDate.getDate().toString()).scrollIntoView({block: "nearest",inline:"center"});
    this.onDateClicked(selectedDate.getDate());
  }


  onDateClicked(id,val?){
    
console.log(val)
    this.selectedId = id;
    this.dateSelected.emit(val)
  }

  public onDate(event): void {
    console.log(event);
  }

}
