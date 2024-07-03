import { Book } from "../book/book.model";
import { ICart } from "./cart.interface";
import { Cart } from "./cart.model";


const createCartIntoDB = async (payload: ICart, user: any) => {

  payload.buyer = user._id;

  let result;

    const updatedBooks = payload?.cart?.map(book=> ({
       qty: book.qty,
      //  @ts-ignore
       _id: book._id 
    }))

    for(let i=0;i<updatedBooks.length;i++){
      
      const bookId = updatedBooks[i]._id;
      
      const book = await Book.findById(updatedBooks[i]._id);

      if (!book) {
        return 404;
      }
  
      // @ts-ignore
      if (updatedBooks[i].qty > book.quantity) {
        return 400
      }
       // @ts-ignore
      book.quantity -= updatedBooks[i].qty;

    if (book.quantity === 0) {
      await book.deleteOne({bookId});
    } else {
      await book.save();
       result = await Cart.create(payload);
    }

    }

    
  return result;
}

const allSalesFromDB = async () => {

  const result = await Cart.find();
  return result;
}

export const cartServices = {
  createCartIntoDB,
  allSalesFromDB
}