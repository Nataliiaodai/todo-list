import { Injectable } from '@angular/core';
import {TaskModel} from "./task.model";
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: TaskModel[] = [];
  starredCount: number = 0;
  isChecked: boolean = true;

  inputValue = '';


  constructor() { }


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


  onListTaskDelete (id: number) {
    for (let task of this.tasks) {
      if (task.taskId === id) {
        let ind: number = this.tasks.indexOf(task);
        this.tasks.splice(ind,1);

        if (task.isStarred) {
          this.starredCount--;
          task.isStarred = false;
        }

      }
    }

  }


  onListTaskClicked(id: number) {
    let taskItem: TaskModel;

    for (let task of this.tasks) {
      if (task.taskId === id) {
        taskItem = task;
        console.log('taskItem', taskItem.taskName);
      }
    }

    for (let task of this.onGetAllTasks()) {
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

  onToggleStar(task: TaskModel): void {
    task.isStarred = !task.isStarred;
    if (task.isStarred) {
      this.starredCount++;
    } else {
      this.starredCount--;
    }
  }

  onGetAllTasks(){
    let filteredTask: TaskModel[] = [];
    for (let task of this.tasks) {
      if (task.isDone=== false) {
        filteredTask.push(task);
      }
    }
    return filteredTask;
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
