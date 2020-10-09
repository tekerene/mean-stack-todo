import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from '../auth/endpoint.config'
import { User } from '../model/user/user'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:3009/';
  public  Status: any;
  selectedUser: User;
  constructor(public http:HttpClient) { }
​
  // getting all Users
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}${endpoints.users}`);
  }
​
  // getting a particular to do by id
  getUser(id:string):Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}${endpoints.user}${id}`);
  }
​
  //  adding a User
  addUser(data: User):Observable<User[]>{
    const url = `${this.baseUrl}${endpoints.addUser}`;
    return this.http.post<User[]>(url, data);
  }
  // Deleting a User 
  deleteUser(id):Observable<User[]>{
    const url = `${this.baseUrl}${endpoints.deleteUser}${id}`;
    return this.http.delete<User[]>(url);
  }
  // Updating a User
  updateUser(id, body):Observable<User[]>{
    const url = `${this.baseUrl}${endpoints.updateUser}${id}`;
    return this.http.patch<User[]>(url, 
      {_id: body._id,
      fullname:body.fullname,
      username: body.username, 
      email:body.email,
      password: body.password, 
      confirmPassword: body.confirmPassword
      });
  }
  login(credentials): Observable<any> {
    const url = `${this.baseUrl}${endpoints.userLogin}`;
    return this.http.post<any>(url, credentials);
  }
  // upload image
  uploadImage(image){
    return this.http.post(`${this.baseUrl}${endpoints.imageUpload}`, image);
  }
}
