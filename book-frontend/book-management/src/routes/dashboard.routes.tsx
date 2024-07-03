import AddBook from "../pages/book-management/AddBook";
import BookManagement from "../pages/book-management/BookManagement";
import SaleHistory from "../pages/sale-management/SaleHistory";
import SellBook from "../pages/sale-management/SellBook";

export const adminPaths = [
    {
      name: 'Book Management',
      children: [
        {
          name: 'Add a Book',
          path: 'add-book',
          element: <AddBook />,
        },
        {
          name: 'Book List',
          path: 'book-list',
          element: <BookManagement />,
        },
      ],
    },
    {
      name: 'Sales Management',
      children: [
        {
          name: 'Sell a Book',
          path: 'sell-book',
          element: <SellBook />,
        },
        {
          name: 'Sales History',
          path: 'sale-history',
          element: <SaleHistory />,
        }
      ],
    },
  ];