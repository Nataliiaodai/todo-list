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
    doneTasks: string[] =[];


    myControl = new FormControl('');
    inputValue = '';
    checked: boolean = true;

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


    onlistTaskDelete (taskIndex: number) {
        this.tasks.splice(taskIndex,1);
        console.log(taskIndex);
        console.log(this.tasks);

          
    }

    onlistTaskClicked(taskIndex: number) {
        // this.tasks.splice(taskIndex,1);
        
         this.doneTasks.push(this.tasks[taskIndex]);
         this.tasks.splice(taskIndex,1);
        console.log(this.tasks[taskIndex]);
        console.log(this.doneTasks);
    }

    onEnterKey() {
       this.onInputBlur(); 
    }

}