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
                return resp;
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
            if (task) {
                const resp = {
                    taskName: task.taskName,
                    completed: task.completed
                };
                return resp;
            }
            else {
                return null;
            }
        }
    },
    Mutation: {
        completeTask: (parent, { stageName, taskName }) => {
            let task = {};
            datastore_1.stages.forEach((stage) => {
                const found = stage.tasks.find((task) => task.taskName === taskName);
                if (found) {
                    task = found;
                }
            });
            if (task) {
                if (task.isCompleted() === false) {
                    task.markAsCompleted();
                }
                const resp = {
                    taskName: task.taskName,
                    completed: task.completed
                };
                return resp;
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
                return resp;
            }
            else {
                return null;
            }
        }
    }
};