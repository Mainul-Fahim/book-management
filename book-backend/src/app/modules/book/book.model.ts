import { Schema, model } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>({
    name: { type: String, required: true},
    image: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    releaseDate: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true},
    genre: { type: String, required: true },
    publisher: { type: String, required: true },
    series: { type: String, required: true  },
    language: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true},

}, { versionKey: false, timestamps: true });


export const Book = model<IBook>('Book', bookSchema);