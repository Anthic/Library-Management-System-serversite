import { startSession, Types } from "mongoose";
import { TBorrow } from "./borrow.interface";
import Book from "../Book/book.module";
import { Borrow } from "./borrow.module";

const borrowBook = async (payload: TBorrow) => {
  const session = await startSession();
  try {
    session.startTransaction();

    if (!payload.bookId || !payload.quantity || !payload.dueDate) {
      throw new Error(
        "Missing required fields: bookId, quantity, and dueDate are required"
      );
    }

 
    let bookObjectId: Types.ObjectId;
    if (typeof payload.bookId === 'string') {
      if (!Types.ObjectId.isValid(payload.bookId)) {
        throw new Error("Invalid book ID format");
      }
      bookObjectId = new Types.ObjectId(payload.bookId);
    } else {
      throw new Error("Book ID must be a string");
    }

    const book = await Book.findById(bookObjectId).session(session);
    if (!book) {
      throw new Error("Book not found");
    }
    if (!book?.available) {
      throw new Error("Book not available");
    }
    if (book.copies < payload?.quantity) {
      throw new Error("Not enough copies available");
    }

    book.copies -= payload.quantity;
    if (book.copies === 0) {
      book.available = false;
    }
    await book.save({ session });

    const newBorrow = await Borrow.create(
      [
        {
          bookId: bookObjectId,
          quantity: payload.quantity,
          dueDate: payload.dueDate,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    await session.endSession();

    
    return newBorrow[0];
  } catch (error) {
    
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getBorrowBookSummary = async (): Promise<any[]> => {
  try {
    const aggregateResult = await Borrow.aggregate([
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
  } catch (error) {
   
    throw error;
  }
};

export const borrowBookService = {
  borrowBook,
  getBorrowBookSummary,
};
