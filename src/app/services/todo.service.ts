import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { empty, Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Todo } from '../model/todo';



@Injectable({
    providedIn: 'root'
  })
  export class TodoService {

     baseUri:string = 'http://localhost:4000/api';
     basecreate:string = 'http://localhost:4000/api/create';
     headers = new HttpHeaders().set('Content-Type', 'application/json');
  errorMgmt: (err: any, caught: Observable<any>) => ObservableInput<any>;
  
    constructor(private http: HttpClient) { }
  
    // getAll(): Observable<any> {
    //   return this.http.get(this.baseUri);
    // }
  
    // get(id): Observable<any> {
    //   return this.http.get(`${this.baseUri}/${id}`);
    // }
  
    createTodo(data: Todo): Observable<any> {
      console.log(data)
      let url = `${this.baseUri}/create`;
      return this.http.post(url, data)
      .pipe(
        map(
          res => {
            return res;
          }
        ), catchError((error) => {
          return throwError(error);
        })
      );
    }
  
 
  // errorMgmt(errorMgmt: any): import("rxjs").OperatorFunction<Object, any> {
  //   throw new Error('Method not implemented.');
  // }
   // Get all employees
   getTodos() {
    return this.http.get(`${this.baseUri}`);
  }

  // Get employee
  getTodo(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  
     // Update employee
  updateTodo(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }
  
    // Delete employee
  deleteTodo(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }
  
     // Error handling 
//   errorMgmt(error: HttpErrorResponse) {
//     let errorMessage = '';
//     if (error.error instanceof ErrorEvent) {
//       // Get client-side error
//       errorMessage = error.error.message;
//     } else {
//       // Get server-side error
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     console.log(errorMessage);
//     return throwError(errorMessage);
//   }

// }
}