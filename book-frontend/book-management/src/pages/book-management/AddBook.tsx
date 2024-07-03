import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import BookForm from '../../components/form/BookForm';
import BookInput from '../../components/form/BookInput';
import { toast } from 'sonner';
import { useAddBookMutation } from '../../redux/features/book/bookApi';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {

    const navigate = useNavigate();

    const [addBook] = useAddBookMutation();

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        const toastId = toast.loading('Adding Book in Inventory');

        try {
            const bookInfo = {
                name: data.name,
                image: data.image,
                price: Number(data.price),
                quantity: Number(data.quantity),
                releaseDate: data.releaseDate,
                author: data.author,
                isbn: data.isbn,
                genre: data.genre,
                publisher: data.publisher,
                series: data.series,
                language: data.language,
            };
            console.log(bookInfo);
            const res = await addBook(bookInfo).unwrap();
            console.log(res);
            // const user = verifyToken(res.data.token) as TUser;
            // dispatch(setUser({ user: user, token: res.data.token }));
            toast.success('Book Added Successfully', { id: toastId, duration: 2000 });
            navigate(`/admin/book-list`);
        } catch (err) {
            toast.error('Something went wrong', { id: toastId, duration: 2000 });
        }
    };

    return (
        <>
            <h1 style={{ marginBottom: '20px' }}>Add a book</h1>
            <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <BookForm onSubmit={onSubmit}>
                    <BookInput type="text" name="name" label="Book Name:" />
                    <BookInput type="text" name="image" label="Image Link:" />
                    <BookInput type="number" name="price" label="Price:" />
                    <BookInput type="number" name="quantity" label="Quantity:" />
                    <BookInput type="date" name="releaseDate" label="Release Date:" />
                    <BookInput type="text" name="author" label="Author:" />
                    <BookInput type="text" name="isbn" label="ISBN:" />
                    <BookInput type="text" name="genre" label="Genre:" />
                    <BookInput type="text" name="publisher" label="Publisher:" />
                    <BookInput type="text" name="series" label="Series:" />
                    <BookInput type="text" name="language" label="language:" />
                    <Button htmlType="submit">Add Book</Button>
                </BookForm>
            </Row>
        </>
    );
};

export default AddBook;