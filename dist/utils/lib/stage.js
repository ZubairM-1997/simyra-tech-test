"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stage {
    constructor(name, tasks) {
        this.completedTasks = 0;
        this.name = name;
        this.tasks = tasks;
        this.completed = false;
    }
    completeStage() {
        const completedTasks = this.tasks.filter((task) => task.completed === true);
        this.completedTasks = completedTasks.length;
        if (this.tasks.length === this.completedTasks) {
            this.completed = true;
        }
        else {
            this.completed = false;
        }
    }
    isStageComplete() {
        return this.completed;
    }
}
exports.default = Stage;
