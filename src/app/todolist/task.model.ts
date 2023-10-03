export class TaskModel {
    taskId?: string;
    taskName: string;
    isDone?: boolean;
    isStarred?: boolean;
    createdDate: Date;
    updatedDate: Date;


    constructor(taskName: string = '', isDone: boolean = false, isStarred: boolean = false, createdDate: Date = new Date(),updatedDate : Date = new Date()) {
        this.taskName = taskName;
        this.isDone = isDone;
        this.isStarred = isStarred;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }

}