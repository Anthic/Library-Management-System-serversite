"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const allRoute_1 = __importDefault(require("./modules/router/allRoute"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [config_1.default.deploymentUrl, "*"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use(allRoute_1.default);
app.get("/", (req, res) => {
    res.send("Library Management System Server is running");
});
app.listen(config_1.default.port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server is running on port ${config_1.default.port} in ${config_1.default.nodeEnv} mode`);
}));
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield mongoose_1.default.connect(config_1.default.mongoUri);
            console.log("Connected to MongoDB successfully");
        }
        catch (error) {
            console.log("Failed to connect to MongoDB", error);
        }
    });
}
connectToDatabase();
