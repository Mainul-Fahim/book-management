import { Table, Button } from 'antd';
import { useBulkDeleteBookMutation, useDeleteBookMutation, useGetAllBooksQuery } from '../../redux/features/book/bookApi';
import { useState } from 'react';
import FilterDropdown from '../filter/FilterDropdown';
import { toast } from 'sonner';
import EditBook from '../../pages/book-management/EditBook';



const filterOptions = [{
  label: 'By Author',
  value: '',
}, {
  label: 'Hakim Ansari',
  value: 'Hakim Ansari',
},
{
  label: 'J.R.R. Tolkien',
  value: 'J.R.R. Tolkien',
},
{
  label: 'Robin Shawrma',
  value: 'Robin Shawrma',
},
{
  label: 'Filter By Genre',
  value: '',
},
{
  label: 'Romance',
  value: 'Romance',
},
{
  label: 'Fantasy',
  value: 'Fantasy',
},
{
  label: 'Self help',
  value: 'Self help',
},
{
  label: 'Filter By Publisher',
  value: '',
},
{
  label: 'Penguin Classics',
  value: 'Penguin Classics',
},
{
  label: 'George Allen & Unwin',
  value: 'George Allen & Unwin',
},
{
  label: 'Filter by Series',
  value: '',
},
{
  label: 'The Lord of the Rings',
  value: 'The Lord of the Rings',
},
{
  label: 'Filter By language',
  value: '',
},
{
  label: 'English',
  value: 'English',
},
{
  label: 'Bangla',
  value: 'Bangla',
},
]


const BookTable = () => {

  const [isEdit, setIsEdit] = useState(false)
  const [isVariant, setIsVariant] = useState(false)
  const [editId, setEditId] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('')

  // @ts-ignore
  const handleEdit = (record) => {
    setEditId(record._id)
    setIsEdit(true)
  }

  // @ts-ignore
  const handleVariant = (record) => {
    setIsVariant(true)
    setIsEdit(true)
    setEditId(record._id)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      key: 'isbn',
    },
    {
      title: 'Publisher',
      dataIndex: 'publisher',
      key: 'publisher',
    },
    {
      title: 'Genre',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Series',
      dataIndex: 'series',
      key: 'series',
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
    },
    {
      title: 'Release Date',
      dataIndex: 'releaseDate',
      key: 'releaseDate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: AnimationPlaybackEvent) => {
        return (
          <>
            <span style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button type="primary" onClick={() => handleEdit(record)}>
                Edit
              </Button>
              <Button style={{ marginLeft: '4px' }} onClick={() => onDelete(record)}>
                Delete
              </Button>
            </span>
            <Button style={{ marginTop: '10px' }} onClick={() => handleVariant(record)}>
              Create Variant
            </Button>
          </>
        )
      },
    },
  ];

  const { data } = useGetAllBooksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  console.log(data?.data?.data?.books);
  const booksData = data?.data?.data?.books;

  const [selectedRows, setSelectedRows] = useState([]);
  // @ts-ignore
  const [isAllSelected, setIsAllSelected] = useState(false);

  // @ts-ignore
  const handleRowSelect = (selectedRowKeys, selectedRows) => {
    setSelectedRows(selectedRows);
    setIsAllSelected(selectedRowKeys.length === booksData.length);
  };

  // const handleSelectAll = () => {
  //   setSelectedRows(booksData);
  //   setIsAllSelected(true);
  // };

  // @ts-ignore
  const handleFilterChange = (value) => {
    console.log(value);
    setSelectedFilter(value);
  }
  console.log(selectedFilter);
  let filteredBooks;

  if (selectedFilter === 'Hakim Ansari') {
    filteredBooks = booksData?.filter((book: any) => book?.author?.toLowerCase() === selectedFilter.toLocaleLowerCase())
  }
  else if (selectedFilter === 'J.R.R. Tolkien') {
    filteredBooks = booksData?.filter((book: any) => book?.author?.toLowerCase() === selectedFilter.toLocaleLowerCase())
  }

  else if (selectedFilter === 'Robin Shawrma') {
    filteredBooks = booksData?.filter((book: any) => book?.author?.toLowerCase() === selectedFilter.toLocaleLowerCase())
  }
  else if (selectedFilter === 'Romance') {
    filteredBooks = booksData?.filter((book: any) => book?.genre?.toLowerCase() === selectedFilter.toLocaleLowerCase())
  }
  else if (selectedFilter === 'Fantasy') {
    filteredBooks = booksData?.filter((book: any) => book?.genre?.toLowerCase() === selectedFilter.toLocaleLowerCase())
  }
  else if (selectedFilter === 'Self help') {
    filteredBooks = booksData?.filter((book: any) => book?.genre?.toLowerCase() === selectedFilter.toLocaleLowerCase())
  }
  else if (selectedFilter === 'Penguin Classics') {
    filteredBooks = booksData?.filter((book: any) => book?.publisher?.toLowerCase() === selectedFilter.toLocaleLowerCase())
  }
  else if (selectedFilter === 'George Allen & Unwin') {
    filteredBooks = booksData?.filter((book: any) => book?.publisher?.toLowerCase() === selectedFilter.toLocaleLowerCase())
  }
  else if (selectedFilter === 'The Lord of the Rings') {
    filteredBooks = booksData?.filter((book: any) => book?.series?.toLowerCase() === selectedFilter.toLocaleLowerCase())
  }
  else if (selectedFilter === 'English') {
    filteredBooks = booksData?.filter((book: any) => book?.language?.toLowerCase() === selectedFilter.toLocaleLowerCase())
  }
  else if (selectedFilter === 'Bangla') {
    filteredBooks = booksData?.filter((book: any) => book?.language?.toLowerCase() === selectedFilter.toLocaleLowerCase())
  }
  else
    filteredBooks = booksData;

  // const [editBook] = useEditBookMutation();
  const [deleteBook] = useDeleteBookMutation();
  const [bulkDeleteBook] = useBulkDeleteBookMutation();

  // @ts-ignore
  const onDelete = async (record) => {
    console.log(data);
    const toastId = toast.loading('Deleting Book from Inventory');

    try {

      console.log(record);
      const res = await deleteBook(record._id);
      console.log(res);
      toast.success('Book Deleted Successfully', { id: toastId, duration: 2000 });

    } catch (err) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  const onBulkDelete = async () => {
    console.log(data);
    const toastId = toast.loading('Deleting Book from Inventory');
    // @ts-ignore
    const bookIds = selectedRows.map(book => book._id)
    console.log(bookIds);
    try {

      const bookInfo = {
        bookIds: bookIds
      };
      console.log(bookInfo);
      const res = await bulkDeleteBook(bookInfo).unwrap();
      console.log(res);
      toast.success('Books Deleted Successfully', { id: toastId, duration: 2000 });

    } catch (err) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };
  console.log(selectedRows);

  // @ts-ignore
  const dataSourceWithKey = (books) => {
    // @ts-ignore
    return books?.map((book) => ({
      ...book,
      key: book?._id, // Assuming _id is a unique identifier for each book
    }));
  };

  return (
    <>

      {
        isEdit ? (<EditBook editId={editId} isVariant={isVariant} />) :
          (
            <div>
              <div style={{ marginBottom: '10px' }}>
                <FilterDropdown label='Filter' options={filterOptions} onChange={handleFilterChange} />
              </div>
              <Table columns={columns} dataSource={filteredBooks?.length > 0 ? dataSourceWithKey(filteredBooks) : dataSourceWithKey(booksData)} rowSelection={{
                selectedRowKeys: selectedRows.map((row) => {
                  console.log(row);
                  // @ts-ignore
                  return (row.key)
                }),
                onChange: handleRowSelect,
                getCheckboxProps: (record) => ({
                  disabled: record.disabled, // Optional: Disable selection for specific rows
                }),
              }} />
              {/* <Button type="primary" onClick={handleSelectAll}>
                Select All
              </Button> */}
              <Button style={{ backgroundColor: 'red', color: 'white' }} type="default" onClick={onBulkDelete}>
                Delete Selected
              </Button>
            </div>
          )
      }

    </>
  );
};

export default BookTable;