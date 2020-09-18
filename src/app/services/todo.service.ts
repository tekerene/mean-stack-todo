import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { empty, Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Todo } from '../model/todo';
import { title } from 'process';



@Injectable({
    providedIn: 'root'
  })
  export class TodoService {

     baseUri:string = 'http://localhost:4000/api';
     basecreate:string = 'http://localhost:4000/api/create';
     headers = new HttpHeaders().set('Content-Type', 'application/json');
  errorMgmt: (err: any, caught: Observable<any>) => ObservableInput<any>;
  
    constructor(private http: HttpClient) { }
    createTodo(data: Todo, file: File): Observable<any> {
      console.log(data)
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', data.title);
      formData.append('desc', data.desc);
      formData.append('image', data.imageUrl)
      formData.append('StartDate', data.date.startDate);
      formData.append('endDate', data.date.endDate);
      const header = new HttpHeaders();
      const params = new HttpParams();
      const options = {
      params,
      reportProgress: true,
      headers: header
     };
    let url = `${this.baseUri}/create`;
    const req = new HttpRequest('POST', url, formData, options);
      return this.http.post(url, data);
      // .pipe(
      //   map(
      //     res => {
      //       return res;
      //     }
      //   ), catchError((error) => {
      //     return throwError(error);
      //   })
      // );
    }
    private handleError(error: HttpErrorResponse): any {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError(
        'Something bad happened; please try again later.');
    }
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