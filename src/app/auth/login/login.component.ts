import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm :FormGroup;
  credentials = {
    username: '',
    password: ''
  }
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }


  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }
    )
  }
  get f() { return this.loginForm.controls }


  login() {
    this.userService.login(this.credentials).subscribe((user) => {
      this.router.navigateByUrl('/home');
      console.log(user);
    }, (err) => {
      console.error(err);
    });
  console.log("login succesfully")
   }
}
