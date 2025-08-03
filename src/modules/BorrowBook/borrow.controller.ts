import { Request, Response } from "express";
import { borrowBookService } from "./borrow.service";

const borrowBook = async (req: Request, res: Response) => {
  try {

    const result = await borrowBookService.borrowBook(req.body);
    res.send({
      success: true,
      message: "Book borrowed successfully",
      data: result,
    });
  } catch (error) {
   
    res.status(500).json({
      success: false,
      message: "Failed to borrow book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
const getBorrowBookSummary = async (req: Request, res: Response) => {
  try {
    const result = await borrowBookService.getBorrowBookSummary();
    res.send({
      success: true,
      message: "Borrow book summary retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrow book summary",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
export const borrowBookController = {
  borrowBook,
  getBorrowBookSummary,
};
