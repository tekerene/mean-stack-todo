import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateTodoComponent } from '../create-todo/create-todo.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @ViewChild (CreateTodoComponent, {static: false})
  private createTodo: CreateTodoComponent;
  //public createTodo = '';
  title = 'Todo';
 
  // onEditTodo($event: any) {
  //   this.createTodo = $event;
  //   }
  

  onEditTodo(event: any) {
  this.createTodo.onEditTodo(event);
  }

}
