import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service'

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})

export class ListTodoComponent implements OnInit {

  todoData: any;
  currentTodo = null;
  currentIndex = -1;
  title = '';
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.retrieveTodo();
  }
  // retreiving all todos from db
  retrieveTodo(): void {
    this.todoService.getAll()
      .subscribe(
        data => {
          this.todoData = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
  // refreshing the form 
  refreshList(): void {
    this.retrieveTodo();
    this.currentTodo = null;
    this.currentIndex = -1;
  }
  setActiveTodo(todo, index): void {
    this.currentTodo  = todo;
    this.currentIndex = index;
  }
  //deleting all todos
  removeAllTodo(): void {
    this.todoService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTodo();
        },
        error => {
          console.log(error);
        });
  }
}
