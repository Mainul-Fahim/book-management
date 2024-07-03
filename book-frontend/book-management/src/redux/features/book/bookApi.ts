import { baseApi } from "../../api/baseApi";

const bookApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      addBook: builder.mutation({
        query: (bookData) => ({
          url: '/book',
          method: 'POST',
          body: bookData,
        }),
        invalidatesTags: ['books'],
      }),
      variantBook: builder.mutation({
        query: (bookData) => {
          // @ts-ignore
          const {_id, ...book} = bookData;
          return({
          url: '/book',
          method: 'POST',
          body: book,
        })},
        invalidatesTags: ['books'],
      }),
      getAllBooks: builder.query({
        query: () => ({
          url: '/books',
          method: 'GET',
        }),
        providesTags: ['books'],
      }),
      editBook: builder.mutation({
        query: (bookData) => {
          const {_id,...book} = bookData;
          console.log(book);
          return({
          url: `/books/${_id}`,
          method: 'PUT',
          body: book,
        })},
        invalidatesTags: ['books'],
      }),
      deleteBook: builder.mutation({
        query: (bookId) => ({
          url: `/books/${bookId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['books'],
      }),
      bulkDeleteBook: builder.mutation({
        query: (bookData) => ({
          url: `/bulk-delete`,
          method: 'DELETE',
          body: bookData,
        }),
        invalidatesTags: ['books'],
      }),
      sellBook: builder.mutation({
        query: (bookData) => 
        {
          const {_id,...book} = bookData;
          return ({
          url: `/sale/${_id}`,
          method: 'POST',
          body: book,
        })},
        invalidatesTags: ['books'],
      }),
      getAllSales: builder.query({
        query: () => ({
          url: '/sales',
          method: 'GET',
        }),
      }),
      addCart: builder.mutation({
        query: (cartData) => ({
          url: '/cart',
          method: 'POST',
          body: cartData,
        }),
        invalidatesTags: ['books'],
      }),
    }),
  });
  
  export const { useAddBookMutation, useGetAllBooksQuery, useEditBookMutation, useDeleteBookMutation, useBulkDeleteBookMutation, useSellBookMutation, useGetAllSalesQuery, useVariantBookMutation, useAddCartMutation} = bookApi;