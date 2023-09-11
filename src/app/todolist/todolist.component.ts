import { Component, OnInit } from "@angular/core";
import { FormControl } from '@angular/forms';
import { TaskModel } from "./task.model";
import * as tls from "tls";

@Component({
    selector: 'app-todolist',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

    constructor() { }
    tasks: TaskModel[] = [];
    lastTaskId: number;
    starredCount: number = 0;
    isChecked: boolean = true;

    myControl = new FormControl('');
    inputValue = '';
    
    

    ngOnInit() {
        this.myControl.valueChanges.subscribe((newValue) => {
          });

    }

    ngDoCheck(){
        // this.totalTasks = this.tasks.length;
        // console.log('fooo');
      }


    onInputBlur() {
        let newTask: TaskModel = new TaskModel;
        if (this.inputValue) {
            newTask.taskName = this.inputValue;
            newTask.taskId = TaskModel.lastId ++;
            this.tasks.push(newTask);
            console.log('tasksLENGTH', this.tasks.length);
            console.log('taskId', newTask.taskId)
        }
            this.inputValue = '';
    }

    onEnterKey() {
        this.onInputBlur(); 
     }
 

    onListTaskDelete (id: number) {
        for (let task of this.tasks) {
            if (task.taskId === id) {
                let ind: number = this.tasks.indexOf(task);
                this.tasks.splice(ind,1);
            }
        }



    }
   

    onListTaskClicked(id: number) {
        let taskItem: TaskModel;

        for (let task of this.tasks) {
            if (task.taskId === id) {
                // let ind: number = this.tasks.indexOf(task);
                taskItem = task;
                console.log('taskItem', taskItem.taskName);
            }
        }


        for (let task of this.getAllTasks()) {
            if (taskItem.taskId === task.taskId) {
                taskItem.isDone = true;
                console.log('taskItem.taskId', taskItem.taskId);
            }
        }

    }

    toggleStar(task: TaskModel): void {
        task.isStarred = !task.isStarred;
        if (task.isStarred) {
            this.starredCount++;
        } else {
            this.starredCount--;
        }
    }

    getAllTasks(){
        let filteredTask: TaskModel[] = [];
        for (let task of this.tasks) {
            if (task.isDone=== false) {
                filteredTask.push(task);
            }
        }
        return filteredTask;
    }

    getDoneTasks() {
        let filteredTask: TaskModel[] = [];
        for (let task of this.tasks) {
            if (task.isDone=== true) {
                filteredTask.push(task);
            }
        }
        return filteredTask;
    }

    onListDoneTaskClicked(id: number) {

        let doneTask: TaskModel;
        for (let task of this.tasks) {
            if (task.taskId === id) {
                // let ind: number = this.tasks.indexOf(task);
                doneTask = task;
                console.log('doneTask', doneTask.taskName);
            }
        }


        for (let task of this.getDoneTasks()) {
            if (doneTask.taskId === task.taskId) {
                doneTask.isDone = false;
            }
        }
    }

  
}