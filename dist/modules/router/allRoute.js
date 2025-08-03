"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_route_1 = require("../Book/book.route");
const borrow_route_1 = require("../BorrowBook/borrow.route");
const router = (0, express_1.Router)();
router.use("/books", book_route_1.bookRoute);
router.use("/borrow", borrow_route_1.borrowBookRoute);
exports.default = router;
