"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBookRoute = void 0;
const express_1 = require("express");
const borrow_controller_1 = require("./borrow.controller");
exports.borrowBookRoute = (0, express_1.Router)();
exports.borrowBookRoute.post("/", borrow_controller_1.borrowBookController.borrowBook);
exports.borrowBookRoute.get("/", borrow_controller_1.borrowBookController.getBorrowBookSummary);
