import {Component, OnInit} from '@angular/core';
import {TodoService} from '../services/todo.service';
import {Status} from '../model/status';
import * as moment from 'moment';
import {interval, Observable} from 'rxjs';
import {map, distinctUntilChanged} from 'rxjs/operators';

@Component({selector: 'app-list-todo', 
templateUrl: './list-todo.component.html',
styleUrls: ['./list-todo.component.css']})

export class ListTodoComponent implements OnInit {
    todoData : any = [];
    istaskCompleted = false;
    search: any;
    overdue = Status["overdue"];
    completed = Status["completed"];
    pending = Status["pending"];
 
    taskDate : Date;

    /**
     * @moment js relative time variables
     */
   
    constructor(private todoService : TodoService) {
        
    }

    ngOnInit(): void {
        this.readTodo();
       
    }

    /**
     * @param todo completed state
     * @param todo pending state
     */

  
    /**
     *@retreiving all todos from db  
     */ 

    readTodo(): void {
        this.todoService.getTodos().subscribe((data) => {
            this.todoData = data;
            this.todoData.forEach(todo => {
            console.log(`***************** ${todo.imageUrl} ****************`);
            const timer = moment(parseInt(todo.timeCreated));
            const dd = moment(timer,'YYYY-MM-DD hh:mm').fromNow()  
            const date = moment(todo.startDate, 'YYYY-MM-DD hh:mm').fromNow();
                todo.diff = "added "+ dd;
            });
        });  
    }

    /**
     * @search todo and filter by title
     */

    // todoDatasearch()=> {
    //     return this.todoData.filter((todo) => {
    //     return todo.title.match(this.search);
    //     })
        
    // }
     todoSearch() {
         if ( this.search == '') {
             return this.ngOnInit()
         }else {
             this.todoData = this.todoData.filter(res => {
                 return res.title.toLowerCase().match(this.search.toLowerCase())
             })
         }
     }

      /*
     * @param todo 
     * @param index 
     */

   /**
    * @Deleting a Todo
    */

    removeTodo(todo, index) {
        if (window.confirm('Are you sure?')) {
            this.todoService.deleteTodo(todo._id).subscribe((data) => {
                this.todoData.splice(index, 1);
                console.log(data + "************* Todo deleted successfully ***")
                window.location.reload();
            })
        }
    }
}
