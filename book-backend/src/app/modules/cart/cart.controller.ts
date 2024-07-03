import catchAsync from "../../utills/catchAsync";
import sendResponse from "../../utills/sendResponse";
import { cartServices } from "./cart.service";

const createCart = catchAsync(async (req, res) => {
    const result = await cartServices.createCartIntoDB(req.body,req.user);

    if(result === 400){
        sendResponse(res, {
            statusCode: 400,
            success: false,
            message: 'Insufficient quantity',
            data: null,
        });
    }


    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Cart added successfully',
        data: result,
    });

});

const getAllSales = catchAsync(async (req, res) => {
    const result = await cartServices.allSalesFromDB();

    if (result) {

        res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Sales retrieved successfully',
            data: result,
        });
    }
});


export const cartController = {
    createCart,
    getAllSales
}