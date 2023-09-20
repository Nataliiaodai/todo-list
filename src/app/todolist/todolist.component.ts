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

    tasks: TaskModel[] = [];
    starredCount: number = 0;
    isChecked: boolean = true;
    inputValue = '';
    myControl = new FormControl('');


    constructor( public taskService: TaskService) { }

    ngOnInit() {
        this.myControl.valueChanges.subscribe((newValue) => {
          });

    }



    onInputBlur() {
        let newTask: TaskModel = new TaskModel;
        if (this.inputValue) {
            newTask.taskName = this.inputValue;

            this.taskService.createTask(newTask).subscribe(
                (response)=> {
                    console.log('This Task was created--', JSON.stringify(response));
                    this.onGetAllTasks();
                }
            )
            console.log('newTask--' , newTask);
            this.inputValue = '';
            // this.onGetAllTasks();
        }
    }





    onGetAllTasks() {
        this.taskService.getTasks().subscribe(
            (response) => {
                // this.tasks.push(response);


                this.tasks= response;
                console.log('Next tasks was fetched from TASKS--', JSON.stringify(response));
            }
        );
    }

    onListTaskDelete(task: TaskModel) {
        this.taskService.deleteTask(task.taskId).subscribe(
            (response) => {
                // this.tasks.push(response);
                console.log('This Task was deleted -- ', JSON.stringify(response));
                this.onGetAllTasks();
            }
        );

    }


    onListTaskClicked(id: number) {
        let taskItem: TaskModel;
        for (let task of this.tasks) {
            if (task.taskId === id) {
                taskItem = task;
                console.log('taskItem', taskItem.taskName);
            }
        }

        for (let task of this.tasks) {
            if (taskItem.taskId === task.taskId) {
                taskItem.isDone = true;
                console.log('taskId', taskItem.taskId);

                if (taskItem.isStarred) {
                    this.starredCount--;
                    taskItem.isStarred = false;
                }

            }

        }

    }

    onSortTasksByDone():TaskModel[] {
        let doneTasks: TaskModel[] = [];
        for (let task of this.tasks){
            if (task.isDone === true) {
                doneTasks.push(task);
            }
        }
        return doneTasks;
    }


    onSortTasksByNotDone():TaskModel[] {
        let notDoneTasks: TaskModel[] = [];
        for (let task of this.tasks){
            if (task.isDone === false) {
                notDoneTasks.push(task);
            }
        }
        return notDoneTasks;
    }

    onToggleStar(task: TaskModel): void {
        task.isStarred = !task.isStarred;
        if (task.isStarred) {
            this.starredCount++;
        } else {
            this.starredCount--;
        }
    }



    onGetDoneTasks() {
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


        for (let task of this.onGetDoneTasks()) {
            if (doneTask.taskId === task.taskId) {
                doneTask.isDone = false;
            }
        }
    }

  
}