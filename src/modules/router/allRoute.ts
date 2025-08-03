import { Router } from "express";
import { bookRoute } from "../Book/book.route";
import { borrowBookRoute } from "../BorrowBook/borrow.route";

const router = Router();

router.use("/books", bookRoute);
router.use("/borrow", borrowBookRoute);

export default router;
