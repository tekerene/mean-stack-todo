import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';
import { Status } from '../model/status'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { endpoints } from '../endpoint.config';
​
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = 'http://localhost:3009';
  public  Status: any;
  constructor(public http:HttpClient) { }
​
  // getting all todos
  getTodos():Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.baseUrl}${endpoints.todos}`);
  }
​
  // getting a particular to do by id
  getTodo(id:string):Observable<Todo[]>{
    return this.http.get<Todo[]>(`${this.baseUrl}${endpoints.todos}${id}`);
  }
​
  //  adding a todo
  addTodo(data):Observable<Todo[]>{
    const url = `${this.baseUrl}${endpoints.addTodo}`;
    return this.http.post<Todo[]>(url, data);
  }
  // Updating the status of a todo
  updateTodoStatus(id, status):Observable<Status>{
    const url = `${this.baseUrl}${endpoints.updateTodo}${id}`;
    return this.http.put<Status>(url, {
      status
    });
  }
  // Deleting a Todo 
  deleteTodo(id):Observable<Todo[]>{
    const url = `${this.baseUrl}${endpoints.deleteTodo}${id}`;
    return this.http.delete<Todo[]>(url);
  }
  // Updating a Todo
  updateTodo(id, body):Observable<Todo[]>{
    const url = `${this.baseUrl}${endpoints.updateTodo}${id}`;
    return this.http.put<Todo[]>(url, body);
  }

  // upload image
  uploadImage(image){
    return this.http.post(`${this.baseUrl}${endpoints.imageUpload}`, image);
  }
}