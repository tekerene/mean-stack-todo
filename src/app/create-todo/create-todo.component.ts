import { Component, OnInit, NgZone } from '@angular/core';
import { Moment } from 'moment';
import { TodoService } from '../services/todo.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css']
})
export class CreateTodoComponent implements OnInit {
  // currentTime: string = moment().format('M-D-YYYY');
  selected: {startDate: Moment, endDate: Moment};
  submited = false;
  todoForm: FormGroup;

  
  submitted = false;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private todoService: TodoService
    ) { 
      this.mainForm();
    }

  ngOnInit(): void {
  }

  mainForm() {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required], Validators.maxLength(100)],
      desc: ['', [Validators.required], Validators.maxLength(280)],
      imageUrl: ['', [Validators.required]],
      
    })
  }
  // Choose designation with select dropdown
  updateProfile(e){
    this.todoForm.get('designation').setValue(e, {
      onlySelf: true
    })
  }

   // Getter to access form control
   get myForm(){
    return this.todoForm.controls;
  }
  
  onSubmit() {
    this.submitted = true;
    if (!this.todoForm.valid) {
      return false;
    } else {
      this.todoService.createTodo(this.todoForm.value).subscribe(
        (res) => {
          console.log('Todo successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/home'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
