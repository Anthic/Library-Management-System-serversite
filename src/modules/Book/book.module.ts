import mongoose, { Schema } from "mongoose";
import { IBook } from "./book.interface";

const BookSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: { type: String, required: true },
    description: { type: String, required: false, trim: true },
    copies: { type: Number, min: 0, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;
