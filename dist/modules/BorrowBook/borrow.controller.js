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
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBookController = void 0;
const borrow_service_1 = require("./borrow.service");
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_service_1.borrowBookService.borrowBook(req.body);
        res.send({
            success: true,
            message: "Book borrowed successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to borrow book",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
const getBorrowBookSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_service_1.borrowBookService.getBorrowBookSummary();
        res.send({
            success: true,
            message: "Borrow book summary retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve borrow book summary",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.borrowBookController = {
    borrowBook,
    getBorrowBookSummary,
};
