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
  selectedTodo: Todo;
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
  updateTodoStatus(id, status):Observable<any>{
    const url = `${this.baseUrl}${endpoints.updateTodo}${id}`;
    return this.http.put<any>(url, {
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
    return this.http.patch<Todo[]>(url, 
      {_id: body._id,
      title:body.title,
      desc: body.desc, 
      imageUrl:body.imageUrl,
      startDate: body.startDate, 
      endDate: body.endDate,
      author:body.author,
      timeCreated: body.timeCreated,
      updatedTime: body.updatedTime});
  }

  // upload image
  uploadImage(image){
    return this.http.post(`${this.baseUrl}${endpoints.imageUpload}`, image);
  }
}