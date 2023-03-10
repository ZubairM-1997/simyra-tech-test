"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const app_1 = __importDefault(require("./app"));
exports.app = new app_1.default();
exports.app.initialize();
exports.app.express.listen(4000, () => {
    console.log(`App listening on port ${4000}`);
});
