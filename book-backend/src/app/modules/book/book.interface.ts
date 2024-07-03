import { Types } from "mongoose";

export interface IBook{
    name: string;
    image?: string;
    price: number;
    quantity: number;
    qty?: number;
    releaseDate: string;
    author: string;
    isbn: string;
    genre: string;
    publisher: string;
    series: string; 
    language: string;
    createdBy: Types.ObjectId;
}