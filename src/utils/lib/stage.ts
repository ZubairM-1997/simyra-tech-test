import Task from "./task";

export default class Stage {

    public name: string;
    public tasks: Task[];
    public completed: boolean;
    public completedTasks = 0;

    constructor(name: string, tasks: Task[]){
        this.name = name;
        this.tasks = tasks
        this.completed = false
    }


    completeStage(): void {
        const completedTasks = this.tasks.filter((task) => task.completed === true)
        this.completedTasks = completedTasks.length

        if (this.tasks.length === this.completedTasks){
            this.completed = true
        } else {
            this.completed = false
        }
    }

    isStageComplete() : boolean {
        return this.completed
    }
}