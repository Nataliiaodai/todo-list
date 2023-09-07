export class  TaskModel{
    taskId: number;
    taskName: string;
    isTasksClicked: boolean;
    isTasksDone: boolean;
    isTasksStarred: boolean;
    isTasksChecked: boolean;


    constructor(taskId: number, taskName: string, isTasksClicked: boolean, isTasksDone: boolean, isTasksStarred: boolean, isTasksChecked: boolean) {
        this.taskId = taskId;
        this.taskName = taskName;
        this.isTasksClicked = isTasksClicked;
        this.isTasksDone = isTasksDone;
        this.isTasksStarred = isTasksStarred;
        this.isTasksChecked = isTasksChecked;
      }

}