"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stages = void 0;
const stage_1 = __importDefault(require("./utils/lib/stage"));
const task_1 = __importDefault(require("./utils/lib/task"));
exports.stages = [
    new stage_1.default('Foundation', [
        new task_1.default('Set up virtual office'),
        new task_1.default('Set mission and vision'),
        new task_1.default('Select business name'),
        new task_1.default('Buy domains'),
    ]),
    new stage_1.default('Discovery', [
        new task_1.default('Create roadmap'),
        new task_1.default('Competitor analysis'),
    ]),
    new stage_1.default('Delivery', [
        new task_1.default('Release marketing website'),
        new task_1.default('Release MVP'),
    ]),
];
