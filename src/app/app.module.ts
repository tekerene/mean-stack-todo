import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import  { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { TodoService } from './services/todo.service';

import { AppComponent } from './app.component';
import { CreateTodoComponent } from './create-todo/create-todo.component';
import { ListTodoComponent } from './list-todo/list-todo.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateTodoComponent,
    ListTodoComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot(),
    FontAwesomeModule,
    CommonModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
