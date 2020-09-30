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
    _todos = [];

    overdue = Status["overdue"];
    completed = Status["completed"];
    pending = Status["pending"];
 
    taskDate : Date;

    /**
     * @moment js relative time variables
     */
    pageLoaded : moment.Moment;
    pageFormat : moment.Moment;
    timeFromNow : Observable < String >;

    constructor(private todoService : TodoService) {
        this.readTodo();
    }

    ngOnInit(): void {
        /**
         * @override todo state
         */
        this.todoService.getTodos().subscribe((todoData) => {
        this._todos = todoData;
        const presentDate = new Date(new Date().toString());
        for (let i = 0; i < this._todos.length; i++) {
            this.taskDate = new Date(new Date(this._todos[i].date).toString());
            if ((this.taskDate < presentDate) && (this._todos[i].status !== this.completed)) {
              this.todoService.updateTodoStatus(this._todos[i]._id, this.overdue).subscribe();
              console.log(this._todos[i]._id + "is expired");
            }
        }
        })

        this.timeFromNow = interval(1000).pipe(
            map(() => this.pageLoaded.fromNow(), this.pageFormat), distinctUntilChanged());
    }

    /**
     * @param todo completed state
     * @param todo pending state
     */

    taskCompleted(todo) {
        this.istaskCompleted = true;
        if (todo.status === Status.pending) {
            this.todoService.updateTodoStatus(todo._id, Status.completed).subscribe((todo) => {
                console.log(todo._id);
                this._todos.forEach((item) => {
                    if (item._id === todo._id) {
                        item.status = Status.completed;
                        console.log(item.status)
                    } 
                })
            });
        } else if (todo.status === Status.completed) {
            this.todoService.updateTodoStatus(todo._id, Status.pending).subscribe((todo) => {
                this._todos.forEach((item) => {
                    if (item._id === todo._id) {
                        console.log(item)
                        item.status = Status.pending;
                    }
                })
            });
        } else 
         return
    }

    /**
     *@retreiving all todos from db  
     */ 

    readTodo(): void {
        this.todoService.getTodos().subscribe((data) => {
            this.todoData = data;
            console.log(data);
            const formatTime = moment(moment.now());
            this.todoData.forEach(todo => {
                console.log(`********************************* ${todo.imageUrl}`);
                // console.log("####### " + this.pageLoaded.toString())
              //this.currentTime = moment().format('LTS');
              const timer = moment(parseInt(todo.timeCreated));
                todo.diff = formatTime.diff(timer,'minute')

             if(todo.diff < 60 ){
                 if (todo.diff == 1){
                     todo.diff + "minute"
                 } else {
                     todo.diff + "minutes"
                 } 
                }
                  if (todo.diff > 60 && todo.diff == 360){
                      if (todo.diff == 60){
                          todo.diff + "hour"
                      } else {
                          todo.diff + "hours"
                      }
                  }
              this.pageLoaded = moment(new Date()).startOf('day').locale("en");
            });
        });  
    }

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
