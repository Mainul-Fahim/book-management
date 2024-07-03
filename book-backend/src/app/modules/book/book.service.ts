
import { IBook } from "./book.interface";
import { Book } from "./book.model";

const createBookIntoDB = async (payload: IBook, user: any) => {

  payload.createdBy = user._id;

  const result = await Book.create(payload);
  return result;
}

const allBooksFromDB = async (query: any, user: any) => {

  const queryObj = { ...query };

  const { page = 1, limit = 10, sortBy, sortOrder, minPrice, maxPrice, releaseDate, author, isbn, genre, publisher, series, language } = queryObj;

  const matchStage: any = {};

  if (minPrice !== undefined && maxPrice !== undefined) {
    matchStage.price = {
      $gte: Number(minPrice),
      $lte: Number(maxPrice),
    };
  }

  if (releaseDate) {
    matchStage.releaseDate = {
      $gte: new Date(releaseDate),
    };
  }

  if (author) {
    matchStage.author = { $regex: new RegExp(author, 'i') }; 
  }

  if (isbn) {
    matchStage.isbn = isbn;
  }

  if (genre) {
    matchStage.genre = genre;
  }

  if (publisher) {
    matchStage.publisher = publisher;
  }

  if (series) {
    matchStage.series = series;
  }

  if (language) {
    matchStage.language = language;
  }

  const aggregationPipeline = [
    { $match: matchStage },
    { $sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 } },
    { $skip: (page - 1) * Number(limit) },
    { $limit: Number(limit) },
    {
      $project: {
        _id: 1,
        name: 1,
        price: 1,
        quantity: 1,
        releaseDate: 1,
        author: 1,
        isbn: 1,
        genre: 1,
        publisher: 1,
        series: 1,
        language: 1,
        createdBy: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ];


  //@ts-ignore 
  const res = await Book.aggregate(aggregationPipeline);
  const total = await Book.countDocuments(matchStage);

  let booksData = [];

  if (user?.role === 'user') {
    const userBooks = res.filter(book => book?.createdBy.toString() === user?._id.toString());
   
    if(userBooks.length > 0) {
          booksData = userBooks
      }

    else {
      return false
    }
  }

  const response = {
    books: (booksData.length>0)? booksData :res,
  };

  const meta = {
    page: page,
    limit: limit,
    total: total,
  };

  const result = {
    meta: meta,
    data: response,
  };

  return result;

}

const singleBookFromDB = async (bookId: string) => {

  const result = await Book.find({ _id: bookId });
  return result;

}

const updateBookFromDB = async (bookId: string, book: IBook, user: any) => {


  let result;
  if (user.role === 'user') {
    const res = await singleBookFromDB(bookId);
    if (res[0].createdBy.toString() === user._id.toString()) {
      await Book.findByIdAndUpdate(bookId, book, {
        new: true,
        runValidators: true,
      });
      result = await singleBookFromDB(bookId)
    }
    else {
      return false
    }
  }


  else {
    await Book.findByIdAndUpdate(bookId, book, {
      new: true,
      runValidators: true,
    });
    result = await singleBookFromDB(bookId)
  }


  return result;
}

const deleteBookFromDB = async (bookId: string,user:any) => {

  if (user.role === 'user') {
    const res = await singleBookFromDB(bookId);
    if (res[0].createdBy.toString() === user._id.toString()) {
      await Book.deleteOne({ _id: bookId });
    }
    else {
      return false
    }
  }
  await Book.deleteOne({ _id: bookId });
  return true;

}

const bulkDeleteBooksFromDB = async (bookIds: string[]) => {
 
  const result = await Book.deleteMany({ _id: { $in: bookIds } });
  if (result.deletedCount > 0) {
    return true;
  } else {
    return false;
  }

}

export const bookServices = {
  createBookIntoDB,
  allBooksFromDB,
  singleBookFromDB,
  updateBookFromDB,
  deleteBookFromDB,
  bulkDeleteBooksFromDB
}