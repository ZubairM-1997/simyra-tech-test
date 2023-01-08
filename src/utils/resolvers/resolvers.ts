import { stages } from "../../datastore" 
import Task from '../lib/task';
import Stage from "../lib/stage"
import { TaskType } from '../types/TaskType';
import { StageType } from '../types/StageType';

export const resolvers = {
    Query: {
        getStage: (parent : any, { stageName } : any) => {
            const foundStage = stages.find((stage) => stage.name === stageName)
            if(foundStage){
                const tasks : TaskType[] = foundStage.tasks.map((task) => 
                ({
                    taskName: task.taskName,
                    completed: task.completed
                }))

                const resp : StageType = {
                    name: foundStage.name,
                    tasks,
                    completed: foundStage.completed,
                    completedTasks: foundStage.completedTasks
                }

                return [resp]
            }

            return null;
        
        },
        getTask: (parent : any , { taskName } : any ) => {
            let task = {} as Task
            stages.forEach((stage: Stage) => {
                const found = stage.tasks.find((task) => task.taskName === taskName)
                if (found) {
                    task = found
                }
            })

            if (task.completed !== undefined && task.taskName !== undefined) {
                const resp : TaskType = {
                    taskName: task.taskName,
                    completed: task.completed
                }
                return [resp]
            } else {
                return null
            }
        },
        getAllStages: (parent: any, args: any) => {
            const stages : StageType[] =  stages.map((stage) => {
                let tasks = stage.tasks.map((task) => ({
                    taskName: task.taskName,
                    completed: task.completed
                }))

                return {
                    name: stage.name,
                    tasks,
                    completed: stage.completed,
                    completedTasks: stage.completedTasks
                }
            }) 

            return stages
        }
    },

    Mutation: {
        completeTask: (parent: any, { taskName } : any) => {
            let task = {} as Task
            stages.forEach((stage: Stage) => {
                const found = stage.tasks.find((task) => task.taskName === taskName)
                if (found) {
                    task = found
                }
            })

            if (task.completed !== undefined && task.taskName !== undefined) {
                
                if (task.isCompleted() === false) {
                    task.markAsCompleted()
                }

                const resp : TaskType = {
                    taskName: task.taskName,
                    completed: task.completed
                }
                return [resp]

            } else {
                return null
            }
        }, 

        completeStage: (parent: any, { stageName } : any) => {
            const foundStage = stages.find((stage) => stage.name === stageName)
            if(foundStage){
                if (foundStage.isStageComplete() === false ) {
                    foundStage.completeStage()
                } 

                const tasks : TaskType[] = foundStage.tasks.map((task) => 
                ({
                    taskName: task.taskName,
                    completed: task.completed
                }))

                const resp : StageType = {
                    name: foundStage.name,
                    completed: foundStage.completed,
                    tasks,
                    completedTasks: foundStage.completedTasks
                }

                return [resp]


            } else {
                return null
            }

        }
    }
}