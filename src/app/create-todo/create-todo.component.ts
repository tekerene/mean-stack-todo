import {Component, Input, OnInit} from '@angular/core';
import { Moment } from 'moment';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';
import { Todo } from '../model/todo'
import * as moment from 'moment';  

@Component({
    selector: 'app-create-todo',
    templateUrl: './create-todo.component.html', 
    styleUrls: ['./create-todo.component.css']
})

export class CreateTodoComponent implements OnInit {
    
    @Input() todos:Todo;
    submitted = false;
    inputVal = 0;
    textVal = 0;
    text = 0;
    inputMax = 0;
    public imagePath : any;


    //public todoForm: FormGroup;
    
    selected : {
        startDate: Moment,
        endDate: Moment
    };
    todoForm: FormGroup;
    picker: any;
    constructor(public fb : FormBuilder, public todoService : TodoService) {this.mainForm()}

   
    ngOnInit(): void {}
    mainForm() {
        this.todoForm = this.fb.group({
            title: ['',[Validators.required, Validators.maxLength(100)]],
            desc: ['',[ Validators.required, Validators.maxLength(250)]],
            imageUrl: ['',[Validators.required]],
            startDate: ['',[Validators.required]],
            endDate: ['',[Validators.required]],
            author: ['',[Validators.required]],
        });
    }
    // SHOW DATE AND TIME LIMIT
    // public updateDateRange() {
    //     this.picker.datePicker.startDate('23/09/2020');
    //     this.picker.datePicker.endDate('2017-04-2021');
    // }
    //function to upload image and save in the serve uploads folder
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
    // function to submit a new task to the database
        
        onSubmit() {
            this.submitted = true;
            //console.log(this.todoForm.value);
            this.todoForm.value.imageUrl = this.imagePath;

             moment.locale('en');
             //let startFormat = moment().format('DD-MM-YYYY, h:mm a');  
            // let endFormat = moment().add(10, 'days').calendar();   
            // this.todoForm.value.startDate = startFormat;
             //this.todoForm.value.endDate = startFormat;
            this.todoForm.value.timeCreated = moment.now();
            this.todoService.addTodo(this.todoForm.value).subscribe((val) => { 
                console.log("Todo successfully submitted"+this.todoForm.value)
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
