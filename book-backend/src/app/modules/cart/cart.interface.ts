import { Types } from "mongoose";
import { IBook } from "../book/book.interface";

export interface ICart{
    buyerName: string;
    cart: [IBook];
    contact: number;
    saleDate: string;
    buyer: Types.ObjectId;
}