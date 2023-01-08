"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const datastore_1 = require("../../datastore");
exports.resolvers = {
    Query: {
        getStage: (parent, { stageName }) => {
            const foundStage = datastore_1.stages.find((stage) => stage.name === stageName);
            if (foundStage) {
                const tasks = foundStage.tasks.map((task) => ({
                    taskName: task.taskName,
                    completed: task.completed
                }));
                const resp = {
                    name: foundStage.name,
                    tasks,
                    completed: foundStage.completed,
                    completedTasks: foundStage.completedTasks
                };
                return [resp];
            }
            return null;
        },
        getTask: (parent, { taskName }) => {
            let task = {};
            datastore_1.stages.forEach((stage) => {
                const found = stage.tasks.find((task) => task.taskName === taskName);
                if (found) {
                    task = found;
                }
            });
            if (task.completed !== undefined && task.taskName !== undefined) {
                const resp = {
                    taskName: task.taskName,
                    completed: task.completed
                };
                return [resp];
            }
            else {
                return null;
            }
        },
        getAllStages: (parent, args) => {
            const stages = stages.map((stage) => {
                let tasks = stage.tasks.map((task) => ({
                    taskName: task.taskName,
                    completed: task.completed
                }));
                return {
                    name: stage.name,
                    tasks,
                    completed: stage.completed,
                    completedTasks: stage.completedTasks
                };
            });
            return stages;
        }
    },
    Mutation: {
        completeTask: (parent, { taskName }) => {
            let task = {};
            datastore_1.stages.forEach((stage) => {
                const found = stage.tasks.find((task) => task.taskName === taskName);
                if (found) {
                    task = found;
                }
            });
            if (task.completed !== undefined && task.taskName !== undefined) {
                if (task.isCompleted() === false) {
                    task.markAsCompleted();
                }
                const resp = {
                    taskName: task.taskName,
                    completed: task.completed
                };
                return [resp];
            }
            else {
                return null;
            }
        },
        completeStage: (parent, { stageName }) => {
            const foundStage = datastore_1.stages.find((stage) => stage.name === stageName);
            if (foundStage) {
                if (foundStage.isStageComplete() === false) {
                    foundStage.completeStage();
                }
                const tasks = foundStage.tasks.map((task) => ({
                    taskName: task.taskName,
                    completed: task.completed
                }));
                const resp = {
                    name: foundStage.name,
                    completed: foundStage.completed,
                    tasks,
                    completedTasks: foundStage.completedTasks
                };
                return [resp];
            }
            else {
                return null;
            }
        }
    }
};
