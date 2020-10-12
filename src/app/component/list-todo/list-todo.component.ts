import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {Status} from '../../model/status';
import * as moment from 'moment';

@Component({selector: 'app-list-todo', 
templateUrl: './list-todo.component.html',
styleUrls: ['./list-todo.component.css']})

export class ListTodoComponent  {
     @Output() update = new EventEmitter();

    todoData: any = [];
    istaskCompleted = false;
    readData: any = [];
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
    ngOnInit(): void{  
       this.readTodo()
    }

    /**
     * @param todo completed state
     * @param todo pending state
     */

  
    /**
     *@retreiving all todos from db  
     */ 
    readTodo(): void {
        this.istaskCompleted = true;
        this.todoService.getTodos().subscribe((data) => {
            // console.log(data)
            this.todoData = data;
            this.todoData.forEach((todo: {updatedTime: string, timeCreated: string, diff: string, update: string, imageUrl: string}) => {
                //console.log(`***************** ${todo.imageUrl} ****************`);
               // console.log(todo.timeCreated);
            const timer = moment(parseInt(todo.timeCreated));
            const dd = moment(timer,'YYYY-MM-DD hh:mm').fromNow() 
                todo.diff = "added "+ dd;
               
            const updatett = moment(parseInt(todo.updatedTime));
            const pp = moment(updatett, 'YYYY-MM-DD hh:mm').fromNow(); 
                todo.update =  "updated"+ pp;
            console.log(todo.update);
            });
        });  
    }
    /**
     * @search todo and filter by title
     */

     todoSearch() {
         if ( this.search === '') {
            this.readTodo();
         }else {
             this.todoData = this.todoData.filter((res) => {
                 return res.title.toLowerCase().match(this.search.toLowerCase());
             })
         }
     }

      /*
     * @update todo 
     * @param index 
     */

    onEditTodo(todo: any){
         this.update.emit(todo);
         //console.log(todo)
       
    }

   /**
    * @Deleting a Todo
    */
    removeTodo(todo, index) {
        if (window.confirm('this is rene deleting')) {
            this.todoService.deleteTodo(todo._id).subscribe((data) => {
                this.todoData.splice(index, 1);
                console.log(data + "************* Todo deleted successfully ***")
                window.location.reload();
            })
        }
    }
}
