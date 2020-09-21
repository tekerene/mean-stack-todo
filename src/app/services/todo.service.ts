import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Todo } from '../model/todo';
import { title } from 'process';



@Injectable({
    providedIn: 'root'
  })
  export class TodoService {

     baseUri:string = 'http://localhost:4000/api';
     basecreate:string = 'http://localhost:4000/api/create';
     baseImage:string = 'http://localhost:4000/api/images';
     headers = new HttpHeaders().set('Content-Type', 'application/json');
  errorMgmt: (err: any, caught: Observable<any>) => ObservableInput<any>;
  
    constructor(private http: HttpClient) { }


    // imageUpload(data:Todo, file:File): Observable<any> {
      
    //   const formData:any = new FormData();
    //   formData.append('file', file);
    //   formData.append("avatar", data.imageUrl);
     
    //   const header = new HttpHeaders();
    //   const params = new HttpParams();
    //   const options = {
    //     params,
    //     reportProgress: true,
    //     headers: header
    //   };
    //   const req = new HttpRequest('POST', this.baseImage, formData, options);
    //   return this.http.request(req);
    // }
    uploadImage(image){
      return this.http.post(`${this.baseUri }/images`, image);
    }
    
    getTodoById(id: string): Observable<any> {
      const url = `${this.baseUri}/${id}`;
      return this.http.get<Todo>(url).pipe(
        catchError(this.handleError)
      );
    }



    
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

    
  // Get all Todos
   getTodos() {
    return this.http.get(`${this.baseUri}`);
    
  }

  // Get todos
  getTodo(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
  
     // Update todos
  updateTodo(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }
  
    // Delete todos
  deleteTodo(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }
  
}