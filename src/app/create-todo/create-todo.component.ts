import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {
  // currentTime: string = moment().format('M-D-YYYY');
  selected: {startDate: Moment, endDate: Moment};
  constructor() { }

  ngOnInit(): void {
  }
}
