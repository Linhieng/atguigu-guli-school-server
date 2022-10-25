"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const teacher_1 = __importDefault(require("./routes/teacher"));
const body_parser_1 = require("body-parser");
const connect_1 = __importDefault(require("./config/connect"));
const errorObj_1 = __importDefault(require("./init/errorObj"));
const globalVas_1 = __importDefault(require("./init/globalVas"));
const globalError_1 = __importDefault(require("./middleware/globalError"));
const initLog_1 = __importDefault(require("./init/initLog"));
const app = (0, express_1.default)();
const PORT = 8001;
(0, initLog_1.default)(app);
(0, connect_1.default)();
(0, globalVas_1.default)();
(0, errorObj_1.default)();
app.use((0, body_parser_1.json)());
app.use('/eduservice/teacher', teacher_1.default);
app.use(globalError_1.default);
http_1.default
    .createServer(app)
    .listen(PORT, () => {
    console.log(`listen http://localhost:${PORT} ...`);
});
