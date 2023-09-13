import { Component, OnInit } from "@angular/core";
import { FormControl } from '@angular/forms';
import { TaskModel } from "./task.model";
import {TaskService} from "./task.service";

@Component({
    selector: 'app-todolist',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.css']

})
export class TodolistComponent implements OnInit {


    // tasks: TaskModel[] = [];
    // starredCount: number = 0;
    // isChecked: boolean = true;
    //
     myControl = new FormControl('');
    // inputValue = '';

    constructor( public taskService: TaskService) { }

    ngOnInit() {
        this.myControl.valueChanges.subscribe((newValue) => {
          });

    }



    onInput() {
        this.taskService.onInputBlur();
        // let newTask: TaskModel = new TaskModel;
        // if (this.inputValue) {
        //     newTask.taskName = this.inputValue;
        //     newTask.taskId = TaskModel.lastId ++;
        //     this.tasks.push(newTask);
        //     console.log('tasksLENGTH', this.tasks.length);
        //     console.log('taskId', newTask.taskId)
        // }
        //     this.inputValue = '';
    }

    onEnterKey() {
        this.taskService.onInputBlur();
     }
 

    onDelete(id: number) {
        this.taskService.onListTaskDelete(id);
        // for (let task of this.tasks) {
        //     if (task.taskId === id) {
        //         let ind: number = this.tasks.indexOf(task);
        //         this.tasks.splice(ind,1);
        //
        //         if (task.isStarred) {
        //             this.starredCount--;
        //             task.isStarred = false;
        //         }
        //
        //     }
        // }

    }
   

    onClick(id: number) {
        this.taskService.onListTaskClicked(id);
        // let taskItem: TaskModel;
        //
        // for (let task of this.tasks) {
        //     if (task.taskId === id) {
        //         taskItem = task;
        //         console.log('taskItem', taskItem.taskName);
        //     }
        // }
        //
        // for (let task of this.getAllTasks()) {
        //     if (taskItem.taskId === task.taskId) {
        //         taskItem.isDone = true;
        //         console.log('taskId', taskItem.taskId);
        //
        //         if (taskItem.isStarred) {
        //             this.starredCount--;
        //             taskItem.isStarred = false;
        //         }
        //
        //     }
        //
        // }

    }

    toggleStar(task: TaskModel): void {
        this.taskService.onToggleStar(task);
        // task.isStarred = !task.isStarred;
        // if (task.isStarred) {
        //     this.starredCount++;
        // } else {
        //     this.starredCount--;
        // }
    }

    getAllTasks(){
        this.taskService.onGetAllTasks();
        // let filteredTask: TaskModel[] = [];
        // for (let task of this.tasks) {
        //     if (task.isDone=== false) {
        //         filteredTask.push(task);
        //     }
        // }
        // return filteredTask;
    }

    getDoneTasks() {
        this.taskService.onGetDoneTasks();
        // let filteredTask: TaskModel[] = [];
        // for (let task of this.tasks) {
        //     if (task.isDone=== true) {
        //         filteredTask.push(task);
        //     }
        //
        // }
        // return filteredTask;
    }

    onListDoneTaskClicked(id: number) {
        this.taskService.onListDoneTaskClicked(id);
        // let doneTask: TaskModel;
        // for (let task of this.tasks) {
        //     if (task.taskId === id) {
        //         // let ind: number = this.tasks.indexOf(task);
        //         doneTask = task;
        //         console.log('doneTask', doneTask.taskName);
        //     }
        // }
        //
        //
        // for (let task of this.getDoneTasks()) {
        //     if (doneTask.taskId === task.taskId) {
        //         doneTask.isDone = false;
        //     }
        // }
    }

  
}