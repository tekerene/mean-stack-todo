// import { Component, OnInit, NgZone } from '@angular/core';
// import { Moment } from 'moment';
// import { TodoService } from '../services/todo.service';
// import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-create-todo',
//   templateUrl: './create-todo.component.html',
//   styleUrls: ['./create-todo.component.css']
// })
// export class CreateTodoComponent implements OnInit {
//   // currentTime: string = moment().format('M-D-YYYY');
//   selected: {startDate: Moment, endDate: Moment};
//   submited = false;
//   todoForm: FormGroup;

  
//   submitted = false;
//   constructor(
//     public fb: FormBuilder,
//     private router: Router,
//     private ngZone: NgZone,
//     private todoService: TodoService
//     ) { 
//        //this.mainForm();
//     }

//   ngOnInit(): void {
//   }
//   mainForm = this.fb.group({
//     title: ['', [Validators.required, Validators.maxLength(100)]],
//     desc: ['', [Validators.required, Validators.maxLength(250)]],
//     dateTime: ['', [Validators.required]],
//     imageUrl: ['', [Validators.required]],
//   });
  
//   // Choose designation with select dropdown
//   updateProfile(e){
//     this.todoForm.get('designation').setValue(e, {
//       onlySelf: true
//     })
//   }

//    // Getter to access form control
//    get myForm(){
//     return this.todoForm.controls;
//   }
  
//   onSubmit() {
//     this.submitted = true;
//     if (!this.todoForm.valid) {
//       return false;
//       console.log("an occured on submit")
//     } else {
//       this.todoService.createTodo(this.todoForm.value).subscribe(
//         (res) => {
//           console.log('Todo successfully created!')
//           // this.ngZone.run(() => this.router.navigateByUrl('/home'))
//         }, (error) => {
//           console.log(error);
//         });
//     }
//   }

// }

import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl  } from '@angular/forms';
import { Moment } from 'moment';
import { FormBuilder, Validators } from '@angular/forms'; 
import { TodoService } from '../services/todo.service';  

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
onSubmit(){
  this.submitted = true;
  if(!this.todoForm.valid) {
    return false;
    console.log("An Error Occured submitting the form")
  } else {
  
  this.todoService.createTodo(this.todoForm.value).subscribe((val) => {
    console.log(val + "Todo submitted successfully");
    console.log(this.todoForm.value);
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