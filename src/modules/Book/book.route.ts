import { Router } from "express";
import { bookController } from "./book.controller";

export const bookRoute = Router();

bookRoute.post("/", bookController.postBook);
bookRoute.get("/:id", bookController.getBookById);
bookRoute.put("/:id", bookController.updateBook);
bookRoute.delete("/:id", bookController.deleteBook);
bookRoute.get("/", bookController.getBook);
