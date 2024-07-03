import { Button, Input, Table } from 'antd';
import { useState } from 'react';
import { useGetAllBooksQuery } from '../../redux/features/book/bookApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addItem, removeCart, selectCart } from '../../redux/features/cart/cartSlice';

const SellBook = () => {

    const { data } = useGetAllBooksQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    console.log(data?.data?.data?.books);
    const booksData = data?.data?.data?.books;

    const navigate = useNavigate();

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
                    <span style={{ display: 'flex', justifyContent: 'space-evenly' }}>

                        <>
                            {/* <Button type="primary" onClick={() => showModal(record)}>
                                Sell
                            </Button> */}
                            {/* @ts-ignore */}
                            <Button type="primary" disabled={cart?.some(book => book?._id === record?._id)} onClick={() => addToCart(record)}>
                                Add to Cart
                            </Button>
                            {/* <Modal
                                title="Sell A Book"
                                open={open}
                                // onOk={handleCancel}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                            >
                                <Row justify="center" align="middle" style={{ height: '100vh' }}>
                                    <BookForm onSubmit={onSubmit}>
                                        <BookInput type="text" name="buyerName" label="Buyer Name:" />
                                        <BookInput type="text" name="quantity" label="Book Quantity:" />
                                        <BookInput type="date" name="saleDate" label="Sale Date:" />

                                        <Button style={{ backgroundColor: 'green', color: 'white' }} htmlType="submit">Sell Book</Button>
                                    </BookForm>
                                </Row>
                            </Modal> */}
                        </>
                    </span>
                )
            },
        },
    ];

    const cart = useAppSelector(selectCart);

    // @ts-ignore
    const addToCart = (book) => {
        dispatch(addItem(book));
    };

    console.log(cart);
    // const [open, setOpen] = useState(false);
    // const [id, setId] = useState('');
    // const [isCheckout, setIsCheckout] = useState(false);
    // @ts-ignore
    // const [confirmLoading, setConfirmLoading] = useState(false);

    // @ts-ignore
    // const showModal = (record) => {
    //     setOpen(true);
    //     setId(record._id)
    // };

    const dispatch = useAppDispatch();

    // @ts-ignore
    // const handleCheckout = () => {
    //     setIsCheckout(false)
    //     console.log('clicked');
    // };

    // console.log(isCheckout);
    // const handleCancel = () => {
    //     console.log('Clicked cancel button');
    //     setOpen(false);
    // };

    // book search state

    const [searchBook, setSearchBook] = useState("")

    console.log(searchBook);

    const searchedBook = booksData?.filter((book: any) => book?.name?.includes(searchBook))

    console.log(searchedBook);

    const tableData = searchedBook?.length > 0 ? searchedBook : booksData;

    console.log(tableData);

    // const [sellBook] = useSellBookMutation();

    // const onSubmit = async (data: FieldValues) => {
    //     console.log(data);
    //     const toastId = toast.loading('Selling Book in Inventory');

    //     try {
    //         const bookInfo = {
    //             _id: id,
    //             buyerName: data.buyerName,
    //             quantity: Number(data.quantity),
    //             saleDate: data.saleDate,
    //         };
    //         console.log(bookInfo, id);
    //         const res = await sellBook(bookInfo).unwrap();
    //         console.log(res);
    //         toast.success('Book Sold Successfully', { id: toastId, duration: 2000 });
    //         navigate(`/`);
    //     } catch (err) {
    //         toast.error('Something went wrong', { id: toastId, duration: 2000 });
    //     }
    // };

    return (
        <div>
            <h1 style={{ marginBottom: '5px' }}>Sell Books</h1>

            <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    type="primary"
                    disabled={cart.length === 0}
                    onClick={() => navigate('/checkout')}

                >
                    <span style={{ color: 'lightcoral', marginRight: '5px' }}>{cart.length}</span> Go to Checkout
                </Button>
                <Button
                    type="primary"
                    style={{ marginLeft: '5px' }}
                    disabled={cart.length === 0}
                    onClick={() => dispatch(removeCart(null))}

                >
                    Clear Cart
                </Button>
            </div>

            <div style={{ margin: '5px', padding: '5px' }}>
                <Input onChange={(e) => setSearchBook(e.target.value)} placeholder="Search for a book to sell" />
            </div>

            <div style={{ marginBottom: '10px' }}>


                {(searchedBook?.length > 0) ? <Table columns={columns} dataSource={searchedBook} /> : <Table columns={columns} dataSource={booksData} />
                }           </div>
        </div>
    );
};

export default SellBook;