import { Injectable } from '@angular/core';
import {TaskModel} from "./task.model";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {



  constructor(private http: HttpClient) { }

  createTask(taskToCreate: TaskModel): Observable<TaskModel>{
    return this.http.post<TaskModel>('http://127.0.0.1:10000/tasks', taskToCreate);
  }



  updateTask(taskToUpdate: TaskModel):Observable<TaskModel> {
    return this.http.put<TaskModel>('http://127.0.0.1:10000/tasks/' + taskToUpdate.taskId, taskToUpdate);
  }


  deleteTask(taskToDelete: TaskModel):Observable<TaskModel> {
    return this.http.delete<TaskModel>('http://127.0.0.1:10000/tasks/' + taskToDelete.taskId);
  }

  getTasks():Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>('http://127.0.0.1:10000/tasks' );
  }


}
