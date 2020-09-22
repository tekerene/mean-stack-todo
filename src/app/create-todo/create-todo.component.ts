import {Component, OnInit} from '@angular/core';
// import { FormGroup, FormControl  } from '@angular/forms';
import {Moment} from 'moment';
import {FormBuilder, Validators} from '@angular/forms';
import {TodoService} from '../services/todo.service';
import {HttpEvent, HttpEventType} from '@angular/common/http';

@Component({selector: 'app-create-todo', templateUrl: './create-todo.component.html', styleUrls: ['./create-todo.component.css']})
export class CreateTodoComponent implements OnInit {

    submitted = false;
    inputVal = 0;
    textVal = 0;
    text = 0;
    inputMax = 0;
    preview : string;
    percentDone : any = 0;
    imagePath : any;

    selected : {
        startDate: Moment,
        endDate: Moment
    };
  

    constructor(private fb : FormBuilder, public todoService : TodoService) {}

    todoForm = this.fb.group({
        title: ['',[Validators.required, Validators.maxLength(100)  ]],
        desc: ['',[ Validators.required, Validators.maxLength(250) ] ],
        imageUrl: ['',[Validators.required] ],
        date: ['',[Validators.required] ]
    });
    ngOnInit(): void {}

    imageUpload(e : {
        target: {
            files: (string | Blob)[];
        };
    }) {
        const fd = new FormData();
        console.log(e.target.files);
        fd.append('image', e.target.files[0]);
        this.todoService.uploadImage(fd).subscribe((path : any) => {
            this.imagePath = path.imgPath;
        });
    }


    onSubmit() {
        this.submitted = true;
        console.log(this.todoForm.value);
        this.todoForm.value.imageUrl = this.imagePath;
        console.log(this.todoForm.value);
        this.todoService.addTodo(this.todoForm.value).subscribe((val) => {
        
        });
      
        window.location.reload();
    }
    wordCount(e) {
        this.inputVal = this.inputMax + e.target.value.length;

        // console.log(e);
    }
    textCount(e) {
        this.textVal = this.text + e.target.value.length;
        // console.log(e);
    }
}
