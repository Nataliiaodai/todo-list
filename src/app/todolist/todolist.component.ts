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
    inputValue: string = '';
    searchValue: string = '';
    // myInputValueControl = new FormControl('');
    // mySearchValueControl = new FormControl('');
    selectedOption: string = 'Newly created';

    constructor(public taskService: TaskService) {
    }

    ngOnInit() {
        // this.myInputValueControl.valueChanges.subscribe(() => {
        // });
        // this.mySearchValueControl.valueChanges.subscribe(() => {
        // });
        this.getAllTasks();
        // console.log('CREATED DATES--', this.tasks.map(task => task.createdDate));
    }


    onInputChange (event: Event, taskToChangeName: TaskModel) {
        const newValue = (event.target as HTMLInputElement).value;
        if ( newValue !== ''){
            taskToChangeName.taskName = newValue;
            this.onUpdateTask(taskToChangeName);
        } else this.getAllTasks();
    }

    formatDate(date: Date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    searchTaskFilter() {
        return this.tasks.filter(task =>
            task.taskName.toLowerCase().includes(this.searchValue.toLowerCase()
            ));
    }


    onTaskInput() {
        let newTask: TaskModel = new TaskModel;
        if (this.inputValue) {
            newTask.taskName = this.inputValue;
            this.createNewTask(newTask);
            this.inputValue = '';
        }
    }


    createNewTask(newTask: TaskModel) {
        this.taskService.createTask(newTask).subscribe(
            (response) => {
                this.getAllTasks();
            }
        )
    }

    getAllTasks() {
        this.searchValue = '';
        this.taskService.getTasks().subscribe(
            (response) => {
                this.tasks = response;
                console.log(response);
            }
        );
    }

    onUpdateTask(task: TaskModel) {
        task.updatedDate = new Date();
        this.taskService.updateTask(task).subscribe(
            (response) => {
                this.getAllTasks();
                console.log("updatedDate---", this.formatDate(task.updatedDate));
            }
        );
    }

    onDeletingTask(task: TaskModel) {
        this.taskService.deleteTask(task.taskId).subscribe(
            (response) => {
                console.log('ON onDeletingTask METHOD taskID--', task.taskId);
                this.getAllTasks();
            }
        );
        console.log('ON onDeletingTask METHOD taskID--', task.taskId);
    }

    starrCheck(task: TaskModel) {
        if (task.isStarred === true) {
            this.starredCount -= 1;
            task.isStarred = false;
            this.onUpdateTask(task);
        }

        this.onDeletingTask(task);
    }


    gettingTaskDone(task: TaskModel) {
        task.isDone = true;
        this.onUpdateTask(task);

    }

    sortTaskByDate(tasksToSort: TaskModel[]) {
        let sortedTasks: TaskModel[] = [];
        if (this.selectedOption === 'Newly created') {
            sortedTasks = this.sortTasksByNewlyCreated(tasksToSort);
        }
        if (this.selectedOption === 'Newly updated') {
            sortedTasks = this.sortTasksByNewlyUpdated(tasksToSort);
        }
        if (this.selectedOption === 'Old created') {
            sortedTasks = this.sortTasksByOldCreated(tasksToSort);
        }
        if (this.selectedOption === 'Old updated') {
            sortedTasks = this.sortTasksByOldUpdated(tasksToSort);
        }

        return sortedTasks;
    }


    sortTasksByNewlyCreated(tasksToSort: TaskModel[]) {
        tasksToSort.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
        return tasksToSort;
    }


    sortTasksByNewlyUpdated(tasksToSort: TaskModel[]) {
        tasksToSort.sort((a, b) => new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime());
        return tasksToSort;
    }


    sortTasksByOldCreated(tasksToSort: TaskModel[]) {
        tasksToSort.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        return tasksToSort;
    }


    sortTasksByOldUpdated(tasksToSort: TaskModel[]) {
        tasksToSort.sort((a, b) => new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime());
        return tasksToSort;
    }


    filterTasksByDone(): TaskModel[] {
        let doneTasks: TaskModel[] = [];
        for (let task of this.searchTaskFilter()) {
            if (task.isDone === true) {
                doneTasks.push(task);
            }
        }
        this.sortTaskByDate(doneTasks);
        return doneTasks;
    }


    filterTasksByNotDone(): TaskModel[] {
        let notDoneTasks: TaskModel[] = [];
        for (let task of this.searchTaskFilter()) {
            if (task.isDone === false) {
                notDoneTasks.push(task);
            }
        }
        this.sortTaskByDate(notDoneTasks);
        return notDoneTasks;
    }

    toggleTaskStar(task: TaskModel): void {
        task.isStarred = !task.isStarred;
        this.onUpdateTask(task);

        if (task.isStarred) {
            this.starredCount++;

        } else {
            this.starredCount--;
        }
    }


    removeTaskFromDone(task: TaskModel) {
        task.isDone = false;
        this.onUpdateTask(task);
    }


}