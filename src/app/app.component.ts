import { Component, Input, ViewChild } from '@angular/core';
import { ListTodoComponent } from './list-todo/list-todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild (ListTodoComponent, {static: false})
  private createTodo: ListTodoComponent;
  title = 'Todo';
 

  onEditTodo(e) {
  this.createTodo.onEditTodo(e);
  }

}
