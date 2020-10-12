import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateTodoComponent } from './component/create-todo/create-todo.component';
import { HomeComponent } from './component/home/home.component';
import { ListTodoComponent } from './component/list-todo/list-todo.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // {path: 'home', component: CreateTodoComponent},
  // {path: 'home', component: ListTodoComponent},
  {path: 'home', component: HomeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
