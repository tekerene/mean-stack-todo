
import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl  } from '@angular/forms';
import { Moment } from 'moment';
import { FormBuilder, Validators } from '@angular/forms'; 
import { TodoService } from '../services/todo.service';  
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {
  submitted = false;
  inputVal = 0;
  textVal = 0;
  text = 0;
  inputMax = 0;
  preview: string;
  percentDone: any = 0;
 
  selected: {startDate: Moment, endDate: Moment};

  constructor(  private fb: FormBuilder, public todoService: TodoService) { }

  todoForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    desc: ['', [Validators.required, Validators.maxLength(250)]],
    imageUrl: ['', [Validators.required]],
    date: ['', [Validators.required]],
  });
  ngOnInit(): void {
   
  }

   // Image Preview
   uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.todoForm.patchValue({
      imageUrl: file
    });
    this.todoForm.get('imageUrl').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  
onSubmit(){
  this.submitted = true;
  if(!this.todoForm.valid) {
    return false;
    console.log("An Error Occured submitting the form")
  } else {
  this.todoService.createTodo(
      this.todoForm.value,
      this.todoForm.value.imageUrl
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.percentDone = false;
      }
    window.location.reload();
  });
}
}
wordCount(e) {
  this.inputVal = this.inputMax + e.target.value.length;
 
  console.log(e);
}
 textCount(e) {
   this.textVal = this.text + e.target.value.length;
 console.log(e);
}
}