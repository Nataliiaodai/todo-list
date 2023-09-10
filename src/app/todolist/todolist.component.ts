import { Component, OnInit } from "@angular/core";
import { FormControl } from '@angular/forms';
import { consoleTestResultHandler } from "tslint/lib/test";
import { TaskModel } from "./task.model";

@Component({
    selector: 'app-todolist',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

    constructor() { }
    tasks: TaskModel[] = [];

    totalTasks: number;
    starredTasks: number = 0;
    doneTasks: TaskModel[] = [];
    isChecked: boolean = true;

    myControl = new FormControl('');
    inputValue = '';
    
    

    ngOnInit() {
        this.myControl.valueChanges.subscribe((newValue) => {
            console.log('Input value:', newValue);
          });

    }


    ngDoCheck(){
        console.log('IN DO CHECK this.doneTasks', this.doneTasks);
        console.log('IN DO CHECK this.tasks', this.tasks);
            
        this.totalTasks = this.tasks.length;
             console.log('IN DO CHECK starredTasks----',this.starredTasks);
    
      }


    onInputBlur() {
        let newTask: TaskModel = new TaskModel;

        if (this.inputValue) {
            newTask.taskName = this.inputValue;
            newTask.taskId += 1;
            TaskModel.lastId = newTask.taskId;
            this.tasks.push(newTask);
            console.log(this.tasks);
        }
            this.inputValue = '';
    }

    onEnterKey() {
        this.onInputBlur(); 
     }
 

    onlistTaskDelete (index: number) {
        this.tasks.splice(index,1);
    }
   

    onlistTaskClicked(index: number) {
        this.doneTasks.push(this.tasks[index]);
        this.tasks.splice(index,1);

    }


    toggleStarColor(starElement: HTMLElement, index: number) {
        starElement.classList.toggle('active-star');
        let task: TaskModel = this.tasks[index];
        console.log('toggleStarColor TASK',task)
        console.log( 'toggleStarColor ISTasksStarred?',task.isTasksStarred)
        task.isTasksStarred = !task.isTasksStarred;
        console.log( 'toggleStarColor ISTasksStarred?',task.isTasksStarred)


        for (let task of this.tasks) {
            if(task.isTasksStarred === true) {
                this.starredTasks += 1;
                console.log('ADDED 1 to STARRED');
            } else  {
                this.starredTasks -= 1;
                console.log('DELETED 1 from STARRED');
            }
        }
     
      
      }



    onlistDoneTaskClicked(index: number) {
        this.tasks.push(this.doneTasks[index]);
        this.doneTasks.splice(index,1);
    }

  
}