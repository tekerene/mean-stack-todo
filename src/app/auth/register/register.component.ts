import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user';
import {UserService } from '../../services/user.service'
import { passwordMatchValidator } from '../passwordValidator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  model: User;
  userList: any = [];
credentials = {
  _id: '',
  fullname: '',
  username: '',
  email: '',
  password:'',
  confirmPassword: ''

}
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    
  }
  createForm() {
    this.signupForm = this.fb.group({
      fullname: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators. required, Validators.minLength(6)]],
    }, 
    { validators: passwordMatchValidator },
    )
  }
  get f() { return this.signupForm.controls }

  onSubmit() {
    this.model = this.signupForm.value;
    this.userService.addUser(this.model).subscribe(
      result => {
        console.log(result);
        if( !result) {
          this.router.navigateByUrl('/login');
        }
      }
    )
    window.location.reload();
  }

  // readUser(){
  //   this.userService.getUsers().subscribe((data) => {
  //      console.log(data)
  //     this.userList = data;
  //     this.userList.forEach(el => {
  //       console.log(el)
  //     });
  //   })
  // }
  // register() {
  //   this.userService.addUser(this.credentials).subscribe(() => {
  //     this.router.navigateByUrl('/home');
  //   }, (err) => {
  //     console.error(err);
  //   });
  // }

}
