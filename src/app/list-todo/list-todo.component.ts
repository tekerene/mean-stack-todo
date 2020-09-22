import {Component, OnInit} from '@angular/core';
import {TodoService} from '../services/todo.service'

@Component({selector: 'app-list-todo', templateUrl: './list-todo.component.html', styleUrls: ['./list-todo.component.css']})

export class ListTodoComponent implements OnInit {

    todoData : any = [];
    isActive = false;
    constructor(private todoService : TodoService) {
        this.readTodo();
    }

    ngOnInit(): void {}
    // retreiving all todos from db
    readTodo(): void {
        this.todoService.getTodos().subscribe((data) => {
            this.todoData = data;
            console.log(data)
            // this.todoData.forEach(todo => {
            //      console.log(`********************************* ${todo.imageUrl}`);
            // });
        });
    }
    removeTodo(todo, index) {
        if (window.confirm('Are you sure?')) {
            this.todoService.deleteTodo(todo.id).subscribe((data) => {
                this.todoData.splice(index, 1);
            })
        }
    }

    // changing the state of the cards
    
    onClick(e) {
        if (this.isActive == true){
            this.isActive = !this.isActive;
        }
        else {
            this.isActive == false;
        }
        
        // e.preventDefault();
        
        console.log("********************8change state ******************************")
        
    }
}

