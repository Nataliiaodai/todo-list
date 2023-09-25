import {Component, OnInit, SimpleChanges} from "@angular/core";
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


    constructor(public taskService: TaskService) {}

    ngOnInit() {
        this.myInputValueControl.valueChanges.subscribe((newValue) => {
        });
        this.mySearchValueControl.valueChanges.subscribe(()=> {
        });

    }

    onTaskSearchFilter() {

          let newTasklist: TaskModel[] = this.tasks.filter(task => task.taskName.toLowerCase().includes(this.searchValue.toLowerCase() ) );
        // for (let task of this.tasks) {
        //     console.log('all Iterating task', this.tasks);
        //     console.log('task I want to find--', this.searchValue.toLowerCase());
        //     console.log('task I compare with--', task.taskName.toLowerCase());
        //     if (task.taskName.toLowerCase().includes(this.searchValue.toLowerCase()) ) {
        //         console.log('task that equals TO what I SEARSH--', task.taskName);
        //          newTasklist.push(task);
        //     }
        //
        // }
        console.log('newTasklist', newTasklist);
        // return newTasklist;

        return newTasklist;

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
                console.log('This Task was created--', JSON.stringify(response));
                this.onGettingAllTasks();
            }
        )
        console.log('newTask--', newTask);
    }

    onGettingAllTasks() {
        this.taskService.getTasks().subscribe(
            (response) => {
                this.tasks = response;
                console.log('Next tasks was fetched from TASKS--', JSON.stringify(response));
            }
        );
    }

    onUpdateTask(task: TaskModel) {
        this.taskService.updateTask(task).subscribe(
            (response) => {
                console.log('Tasks was update TO--', JSON.stringify(response));
                this.onGettingAllTasks();
            }
        );
    }

    onDeletingTask(task: TaskModel) {
        this.taskService.deleteTask(task.taskId).subscribe(
            (response) => {
                console.log('This Task was deleted -- ', JSON.stringify(response));
                this.onGettingAllTasks();
            }
        );
    }

    onBasketClick(task: TaskModel) {
        console.log('is task to delete isStarred --', task.isStarred);
        if (task.isStarred === true) {
            this.starredCount -= 1;
            task.isStarred = false;
            this.onUpdateTask(task);
        }

        this.onDeletingTask(task);
    }


    onTaskCheckClicked(task: TaskModel) {
        console.log('Clicked Task---', task);

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
        console.log('is task isStarred before change--', task.isStarred);
        task.isStarred = !task.isStarred;
        this.onUpdateTask(task);
        console.log('is task isStarred after change--', task.isStarred);
        if (task.isStarred) {
            console.log('this.starredCount before ++ count--', this.starredCount);
            this.starredCount++;

        } else {
            this.starredCount--;
        }
        console.log('this.starredCount after all--', this.starredCount);
    }


    onDoneTaskCheckClicked(task: TaskModel) {
        console.log('Done Task that Clicked--', task);
        console.log('Is Done Task that Clicked isDone? --', task.isDone);
        task.isDone = false;
        this.onUpdateTask(task);
    }


}