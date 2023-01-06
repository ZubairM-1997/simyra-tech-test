"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(taskName) {
        this.taskName = taskName;
        this.completed = false;
    }
    isCompleted() {
        return this.completed;
    }
    markAsCompleted() {
        this.completed = true;
    }
}
exports.default = Task;
