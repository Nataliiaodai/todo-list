import { Component, OnInit } from "@angular/core";
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-todolist',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

    constructor() { }
    tasks: string[] = [];

    myControl = new FormControl('');
    inputValue = '';

    ngOnInit() {
        this.myControl.valueChanges.subscribe((newValue) => {
            console.log('Input value:', newValue);
          });
    }


    onInputBlur() {
        if (this.inputValue) {
            this.tasks.push(this.inputValue);
        }
            this.inputValue = '';
    }


     onlistTaskClecked (taskIndex: number) {
        this.tasks.splice(taskIndex,1);
        console.log(taskIndex);
        console.log(this.tasks);

          
    }


    onEnterKey() {
       this.onInputBlur(); 
    }

}