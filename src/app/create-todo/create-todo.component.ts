import { Component, OnInit } from '@angular/core';
import { Moment } from 'moment';
import { TodoService } from '../services/todo.service'
@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {
  // currentTime: string = moment().format('M-D-YYYY');
  selected: {startDate: Moment, endDate: Moment};

  todoData = {
    title: '',
    description: '',
    imageUrl: '',
    published: false
  };
  submitted = false;
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  // saving the todo 
  saveTodo(): void {
    const data = {
      title: this.todoData.title,
      description: this.todoData.description
    };

    this.todoService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }
  // submiting todo
  newTodo(): void {
    this.submitted = false;
    this.todoData = {
      title: '',
      description: '',
      imageUrl: '',
      published: false
    };
  }
}
