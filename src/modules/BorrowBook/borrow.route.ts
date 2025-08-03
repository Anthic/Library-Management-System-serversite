import { Router } from "express";
import { borrowBookController } from "./borrow.controller";

export const borrowBookRoute = Router();

borrowBookRoute.post("/", borrowBookController.borrowBook);
borrowBookRoute.get("/", borrowBookController.getBorrowBookSummary);
