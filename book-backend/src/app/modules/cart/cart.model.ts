import { Schema, model } from "mongoose";
import { ICart } from "./cart.interface";
import { IBook } from "../book/book.interface";

const bookSchema = new Schema<IBook>({
    name: { type: String, required: true},
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    qty: { type: Number, required: true },
    releaseDate: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true},
    genre: { type: String, required: true },
    publisher: { type: String, required: true },
    series: { type: String, required: true  },
    language: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true},

}, { versionKey: false, timestamps: true });

const cartSchema = new Schema<ICart>({
    buyerName: { type: String, required: true},
    cart: {
        type: [bookSchema],
      },
    saleDate: { type: String, required: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true},

}, { versionKey: false, timestamps: true });


export const Cart = model<ICart>('Cart', cartSchema);