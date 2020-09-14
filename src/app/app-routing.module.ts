import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTodoComponent } from './create-todo/create-todo.component';
import { ListTodoComponent } from './list-todo/list-todo.component';

const routes: Routes = [
  {path: 'home', component: CreateTodoComponent},
  {path: 'home', component: ListTodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
