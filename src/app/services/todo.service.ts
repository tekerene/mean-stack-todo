import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
  })
  export class TodoService {

     baseUri:string = 'http://localhost:4000/api';
     headers = new HttpHeaders().set('Content-Type', 'application/json');
  
    constructor(private http: HttpClient) { }
  
    // getAll(): Observable<any> {
    //   return this.http.get(baseUrl);
    // }
  
    // get(id): Observable<any> {
    //   return this.http.get(`${baseUrl}/${id}`);
    // }
  
    createTodo(data): Observable<any> {
      let url = `${this.baseUri}/create`;
      return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
    }
  errorMgmt(errorMgmt: any): import("rxjs").OperatorFunction<Object, any> {
    throw new Error('Method not implemented.');
  }
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