import { TaskType
 } from "./TaskType"

export type StageType = {
    name: string,
    tasks: TaskType[],
    completed: boolean,
    completedTasks: number
    
}