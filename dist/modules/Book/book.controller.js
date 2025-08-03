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
exports.bookController = void 0;
const book_module_1 = __importDefault(require("./book.module"));
const postBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loadBook = req.body;
        const newBook = yield book_module_1.default.create(loadBook);
        res.status(201).json({
            success: true,
            message: "Book added successfully",
            data: newBook,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add book",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_module_1.default.find({});
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve books",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const book = yield book_module_1.default.findById(id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve book",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const book = yield book_module_1.default.findByIdAndUpdate(id, updatedData, { new: true });
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update book",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const book = yield book_module_1.default.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete book",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.bookController = {
    postBook,
    getBook,
    getBookById,
    updateBook,
    deleteBook,
};
