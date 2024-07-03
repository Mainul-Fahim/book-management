import catchAsync from "../../utills/catchAsync";
import sendResponse from "../../utills/sendResponse";
import { bookServices } from "./book.service";

const createBook = catchAsync(async (req, res) => {
    const result = await bookServices.createBookIntoDB(req.body,req.user);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Book created successfully',
        data: result,
    });
});

const getAllBooks = catchAsync(async (req, res) => {
    const result = await bookServices.allBooksFromDB(req.query,req.user);
 
    if (result) {

        res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Books retrieved successfully',
            data: result,
        });
    }
    else {
        res.status(200).json({
            statusCode: 401,
            success: true,
            message: 'You do not own any book',
            data: result,
        });
    }
});

const updateBook = catchAsync(async (req, res) => {
    const id = req.params.bookId
    const result = await bookServices.updateBookFromDB(id, req.body,req.user);
   
    if (result) {

        res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Books updated successfully',
            data: result,
        });
    }
    else {
        res.status(200).json({
            statusCode: 401,
            success: true,
            message: 'Do not have permission to update',
            data: result,
        });
    }
});

const deleteBookById = catchAsync(async (req, res) => {

    const id = req.params.bookId;
   
    const result = await bookServices.deleteBookFromDB(id,req.user);

   
    if (result) {

        res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Books deleted successfully',
            data: result,
        });
    }
    else {
        res.status(200).json({
            statusCode: 401,
            success: true,
            message: 'Do not have permission to delete',
            data: result,
        });
    }
});

const bulkDeleteBooksById = catchAsync(async (req, res) => {

    const { bookIds } = req.body;
   

    const result = await bookServices.bulkDeleteBooksFromDB(bookIds);

    if (result) {

        res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Books deleted successfully',
            data: result,
        });
    }
    else {
        res.status(200).json({
            statusCode: 401,
            success: true,
            message: 'No books found with the given IDs.',
            data: result,
        });
    }
});

export const bookController = {
    createBook,
    getAllBooks,
    updateBook,
    deleteBookById,
    bulkDeleteBooksById
}