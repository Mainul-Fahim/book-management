
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { createBookValidationSchema, updateBookValidationSchema } from './book.validation';
import { bookController } from './book.controller';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/book',auth(USER_ROLE.manager,USER_ROLE.user),validateRequest(createBookValidationSchema),bookController.createBook);
router.put('/books/:bookId',auth(USER_ROLE.manager,USER_ROLE.user),validateRequest(updateBookValidationSchema),bookController.updateBook);
router.get('/books',auth(USER_ROLE.manager,USER_ROLE.user),bookController.getAllBooks);
router.delete('/books/:bookId',auth(USER_ROLE.manager,USER_ROLE.user),bookController.deleteBookById);
router.delete('/bulk-delete',auth(USER_ROLE.manager),bookController.bulkDeleteBooksById);

export const bookRoutes = router