import { Types } from "mongoose";

export type TBorrow = {
  bookId: Types.ObjectId | string;
  quantity: number;
  dueDate: Date;
  createAt?: Date;
  updateAt?: Date;
};
export type TBorrowCreate = {
  bookId: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
};
