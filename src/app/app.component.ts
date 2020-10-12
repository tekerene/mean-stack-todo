import { Component, Input, ViewChild } from '@angular/core';
import { CreateTodoComponent } from './component/create-todo/create-todo.component';
import { ListTodoComponent } from './component/list-todo/list-todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
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
