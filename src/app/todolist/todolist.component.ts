import {Component, OnInit} from "@angular/core";
import {FormControl} from '@angular/forms';
import {TaskModel} from "./task.model";
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
    searchValue = '';
    myInputValueControl = new FormControl('');
    mySearchValueControl = new FormControl('');


    constructor(public taskService: TaskService) {
    }

    ngOnInit() {
        this.myInputValueControl.valueChanges.subscribe(() => {
        });
        this.mySearchValueControl.valueChanges.subscribe(() => {
        });
        this.onGettingAllTasks();

    }

    onTaskSearchFilter() {
        return this.tasks.filter(task =>
            task.taskName.toLowerCase().includes(this.searchValue.toLowerCase()
            ));
    }


    onTaskInput() {
        let newTask: TaskModel = new TaskModel;
        if (this.inputValue) {
            newTask.taskName = this.inputValue;
            this.onCreatingNewTask(newTask);
            this.inputValue = '';
        }
    }


    onCreatingNewTask(newTask: TaskModel) {
        this.taskService.createTask(newTask).subscribe(
            (response) => {
                this.onGettingAllTasks();
            }
        )
        // console.log('newTask--', newTask);
    }

    onGettingAllTasks() {
        this.searchValue = '';
        this.taskService.getTasks().subscribe(
            (response) => {
                this.tasks = response;
                console.log(response);
            }
        );
    }

    onUpdateTask(task: TaskModel) {
        this.taskService.updateTask(task).subscribe(
            (response) => {
                this.onGettingAllTasks();
            }
        );
    }

    onDeletingTask(task: TaskModel) {
        this.taskService.deleteTask(task.taskId).subscribe(
            (response) => {
                console.log('ON onDeletingTask METHOD taskID--', task.taskId);
                this.onGettingAllTasks();
            }
        );
        console.log('ON onDeletingTask METHOD taskID--', task.taskId);
    }

    onBasketClick(task: TaskModel) {
        if (task.isStarred === true) {
            this.starredCount -= 1;
            task.isStarred = false;
            this.onUpdateTask(task);
        }

        this.onDeletingTask(task);
    }


    onTaskCheckClicked(task: TaskModel) {
        task.isDone = true;
        if (task.isStarred) {
            this.starredCount--;
            task.isStarred = false;
        }
        this.onUpdateTask(task);

    }

    onSortTasksByDone(): TaskModel[] {
        let doneTasks: TaskModel[] = [];
        for (let task of this.onTaskSearchFilter()) {
            if (task.isDone === true) {
                doneTasks.push(task);
            }
        }
        return doneTasks;
    }


    onSortTasksByNotDone(): TaskModel[] {
        let notDoneTasks: TaskModel[] = [];
        for (let task of this.onTaskSearchFilter()) {
            if (task.isDone === false) {
                notDoneTasks.push(task);
            }
        }
        return notDoneTasks;
    }

    onToggleStar(task: TaskModel): void {

        task.isStarred = !task.isStarred;
        this.onUpdateTask(task);

        if (task.isStarred) {
            this.starredCount++;

        } else {
            this.starredCount--;
        }
    }


    onDoneTaskCheckClicked(task: TaskModel) {
        task.isDone = false;
        this.onUpdateTask(task);
    }


}