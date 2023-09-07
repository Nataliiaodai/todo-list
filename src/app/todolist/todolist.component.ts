import { Component, OnInit } from "@angular/core";
import { FormControl } from '@angular/forms';
import { TaskModel } from "./task.model";

@Component({
    selector: 'app-todolist',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

    constructor() { }
    tasks: string[] = [];
    doneTasks: string[] =[];
    isChecked: boolean = true;
    starredTasks: string[] = [];
    totalTasks: number;
   
    myControl = new FormControl('');
    inputValue = '';
    

    ngOnInit() {
        this.myControl.valueChanges.subscribe((newValue) => {
            console.log('Input value:', newValue);
          });
    }

    toggleStarColor(starElement: HTMLElement, index: number) {
        starElement.classList.toggle('active-star');
        console.log('IF staredTasks.includes)--', this.starredTasks.includes(this.tasks[index]))
        console.log('index', index);
        let elem: string = this.tasks[index];

        if(!this.starredTasks.includes(this.tasks[index])){
            this.starredTasks.push(this.tasks[index]);
            console.log("PUSHING",this.tasks[index]);
            console.log('this.tasks[index] --', this.tasks[index]);
            console.log('this.staredTasks --', this.starredTasks);
        } else {
            let elemToDel = this.starredTasks.indexOf(elem);
            this.starredTasks.splice(elemToDel, 1);
            console.log("SPLICING", index)
            console.log('this.staredTasks --', this.starredTasks);
            console.log('this.tasks[index] --', this.tasks[index]);
            console.log('this.staredTasks --', this.starredTasks);
        }       
      
      }


    onlistDoneTaskClicked(index: number) {
        console.log('WE CLICKED ON: ',this.doneTasks[index]);
        this.tasks.push(this.doneTasks[index]);
        this.doneTasks.splice(index,1);

        console.log('DONE: ',this.doneTasks);
        console.log('TODO: ', this.tasks); 
    }


    onInputBlur() {
        if (this.inputValue) {
            this.tasks.push(this.inputValue);
        }
            this.inputValue = '';
    }


    onlistTaskDelete (taskIndex: number) {
        let ind: number = taskIndex;
        console.log('index of task I clicked', this.tasks[ind]);

        if (this.starredTasks.includes(this.tasks[ind])){
            let elemToDel = this.starredTasks.indexOf(this.tasks[ind]);
            this.starredTasks.splice(elemToDel, 1);
        }

        this.tasks.splice(taskIndex,1);
        console.log(taskIndex);
        console.log(this.tasks);
    }

    ngDoCheck(){
        this.totalTasks = this.tasks.length;
        console.log("DO CHECK")
        console.log('this.tasks.length', this.tasks.length);
        console.log("this.staredTasks.length", this.starredTasks.length)
      }

   

    onlistTaskClicked(taskIndex: number) {
        let ind: number = taskIndex;
        if (this.starredTasks.includes(this.tasks[ind])){
            let elemToDel = this.starredTasks.indexOf(this.tasks[ind]);
            this.starredTasks.splice(elemToDel, 1);
        }

        console.log('WE CLICKED ON: ',this.tasks[taskIndex]);
        this.doneTasks.unshift(this.tasks[taskIndex]);
        this.tasks.splice(taskIndex,1);
        console.log('DONE: ',this.doneTasks);
        console.log('TODO: ', this.tasks); 
       
    }

    onEnterKey() {
       this.onInputBlur(); 
    }

}