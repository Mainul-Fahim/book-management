import cors from 'cors';
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import { authRoutes } from './app/modules/auth/auth.route';
import { bookRoutes } from './app/modules/book/book.route';
import { saleRoutes } from './app/modules/sales/sale.route';
import { cartRoutes } from './app/modules/cart/cart.route';

const app:Application = express()

//parsers
app.use(express.json());
app.use(cors({ origin: ['https://book-frontend-nine.vercel.app','http://localhost:5173'], credentials: true }));

app.use('/api',authRoutes)
app.use('/api',bookRoutes)
app.use('/api',saleRoutes)
app.use('/api',cartRoutes)

app.use(globalErrorHandler);
app.use(notFound);

export default app