export class TaskModel {
    taskId?: number;
    taskName: string;
    isDone?: boolean;
    isStarred?: boolean;


    constructor(taskName: string = '', isDone: boolean = false, isStarred: boolean = false) {
        this.taskName = taskName;
        this.isDone = isDone;
        this.isStarred = isStarred;
    }

}