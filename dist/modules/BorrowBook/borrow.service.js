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
exports.borrowBookService = void 0;
const mongoose_1 = require("mongoose");
const book_module_1 = __importDefault(require("../Book/book.module"));
const borrow_module_1 = require("./borrow.module");
const borrowBook = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        if (!payload.bookId || !payload.quantity || !payload.dueDate) {
            throw new Error("Missing required fields: bookId, quantity, and dueDate are required");
        }
        let bookObjectId;
        if (typeof payload.bookId === 'string') {
            if (!mongoose_1.Types.ObjectId.isValid(payload.bookId)) {
                throw new Error("Invalid book ID format");
            }
            bookObjectId = new mongoose_1.Types.ObjectId(payload.bookId);
        }
        else {
            throw new Error("Book ID must be a string");
        }
        const book = yield book_module_1.default.findById(bookObjectId).session(session);
        if (!book) {
            throw new Error("Book not found");
        }
        if (!(book === null || book === void 0 ? void 0 : book.available)) {
            throw new Error("Book not available");
        }
        if (book.copies < (payload === null || payload === void 0 ? void 0 : payload.quantity)) {
            throw new Error("Not enough copies available");
        }
        book.copies -= payload.quantity;
        if (book.copies === 0) {
            book.available = false;
        }
        yield book.save({ session });
        const newBorrow = yield borrow_module_1.Borrow.create([
            {
                bookId: bookObjectId,
                quantity: payload.quantity,
                dueDate: payload.dueDate,
            },
        ], { session });
        yield session.commitTransaction();
        yield session.endSession();
        return newBorrow[0];
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
const getBorrowBookSummary = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aggregateResult = yield borrow_module_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$bookId",
                    totalQuantityBorrowed: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo",
                },
            },
            {
                $unwind: "$bookInfo",
            },
            {
                $project: {
                    _id: 0,
                    title: "$bookInfo.title",
                    isbn: "$bookInfo.isbn",
                    totalQuantityBorrowed: 1,
                },
            },
        ]);
        return aggregateResult;
    }
    catch (error) {
        throw error;
    }
});
exports.borrowBookService = {
    borrowBook,
    getBorrowBookSummary,
};
