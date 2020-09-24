import {Component, OnInit} from '@angular/core';
import {TodoService} from '../services/todo.service';
import { Status } from '../model/status';

@Component({
selector: 'app-list-todo', 
templateUrl: './list-todo.component.html',
styleUrls: ['./list-todo.component.css']})

export class ListTodoComponent implements OnInit {
    currentTodo = null;
    todoData : any = [];
    //isActive = false;
    istaskCompleted = false;

    _todos = [];
    overdue = "overdue";
    
    completed = "completed";
    pending = "pending";
    taskDate: Date;
    
    constructor(private todoService : TodoService) {
        this.readTodo();
    }

    ngOnInit(): void {
    //   this.todoService.getTodos().subscribe((todoData) => {
    //     this._todos = todoData;
    //     const presentDate = new Date(new Date().toISOString());
    //     for (let i = 0; i < this._todos.length; i++) {
    //       this.taskDate = new Date(new Date(this._todos[i].date).toISOString());
    //       if ((this.taskDate < presentDate) && (this._todos[i].status !== this.completed)) {
    //         this.todoService.updateTodoStatus(this._todos[i]._id, this.overdue).subscribe();
    //       }
    //     }
    //   })
     }

    taskCompleted(todo) {
        this.istaskCompleted = true;
        if (this.todoService.Status === this.pending) {
          this.todoService.updateTodoStatus(todo._id, this.completed).subscribe((todo) => {
            this._todos.forEach((item) => {
              if (item._id === todo._id) {
                item.status = this.completed;
              }
            })
          }
          );
        } else if (todo.status === this.completed) {
          this.todoService.updateTodoStatus(todo._id, this.pending).subscribe((todo) => {
            this._todos.forEach((item) => {
              if (item._id === todo._id) {
                item.status = this.pending;
              }
            })
          });
        }
        else return
      }

    // retreiving all todos from db
    readTodo(): void {
        this.todoService.getTodos().subscribe((data) => {
            this.todoData = data;
            console.log(data)
            this.todoData.forEach(todo => {
                 console.log(`********************************* ${todo.imageUrl}`);
            });
        });
    }
    removeTodo(todo, index) {
        if (window.confirm('Are you sure?')) {
            this.todoService.deleteTodo(todo._id).subscribe((data) => {
                this.todoData.splice(index, 1);
                console.log(data +"************* Todo deleted successfully ***")
            window.location.reload();
            })
        }
        
    }

    // changing the state of the cards
    
    // onClick(e) {
    //     if (this.isActive == false){
    //         this.isActive = true;
    //     }
    //     else {
    //         this.isActive = false;
    //     }
        
    //     // e.preventDefault();
        
    //     console.log("********************8change state ******************************")
        
    // }
}

