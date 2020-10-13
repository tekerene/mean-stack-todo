import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CreateTodoComponent } from './component/create-todo/create-todo.component';
import { ListTodoComponent } from './component/list-todo/list-todo.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild (CreateTodoComponent, {static: false})
  private createTodo: CreateTodoComponent;
  //public createTodo = '';
  title = 'Todo';
  userDetails: any;
  
  constructor(private userService: UserService, private router: Router) { }
  ngOnInit() {
 
  }

  checkUser(user){
    this.userService.getUser(user._id).subscribe(res => {
      this.userDetails = res['user'];
    },err => {
      console.log(err);
    })
  }
 
  onLogout(user, index){
    this.userService.deleteUser(user._id);
    this.router.navigate(['/login']);
  }

}
