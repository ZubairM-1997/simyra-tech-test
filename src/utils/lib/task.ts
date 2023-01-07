export default class Task {
    public taskName: string
    public completed: boolean

    constructor(taskName: string) {
        this.taskName = taskName
        this.completed = false;
    }

    public isCompleted() : boolean {
        return this.completed
    }

    public markAsCompleted() : void {
        this.completed = true
    }
}