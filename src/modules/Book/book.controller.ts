import Book from "./book.module";
import { Request, Response } from "express";

const postBook = async (req: Request, res: Response) => {
  try {
    const loadBook = req.body;
    const newBook = await Book.create(loadBook);
    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getBook = async (req: Request, res: Response) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const book = await Book.findByIdAndUpdate(id, updatedData, { new: true });
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const bookController = {
  postBook,
  getBook,
  getBookById,
  updateBook,
  deleteBook,
};
