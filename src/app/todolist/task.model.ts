export class  TaskModel{
    static lastId: number = 0;
    taskId: number;
    taskName: string;
    isTasksDone: boolean;
    isTasksStarred: boolean;


    constructor(taskId: number = 0, taskName: string = '', isTasksDone: boolean = false, isTasksStarred: boolean = false) {
        this.taskId = taskId;
        this.taskName = taskName;
        this.isTasksDone = isTasksDone;
        this.isTasksStarred = isTasksStarred;
      }

}