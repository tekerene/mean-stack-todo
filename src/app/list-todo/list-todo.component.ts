import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service'

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})

export class ListTodoComponent implements OnInit {

  todoData: any = [];
 
  constructor(private todoService: TodoService) {
    this.readTodo(); 
  }

  ngOnInit(): void {
    
  }
  // retreiving all todos from db
  readTodo(): void {
    this.todoService.getTodos().subscribe((data) => {
      this.todoData = data;
        });
  }
  removeTodo(todo, index) {
    if(window.confirm('Are you sure?')) {
        this.todoService.deleteTodo(todo._id).subscribe((data) => {
          this.todoData.splice(index, 1);
        }
      )    
    }
  }

 
}
