import { useNavigate } from "react-router-dom";
import { useEditBookMutation, useGetAllBooksQuery, useVariantBookMutation } from "../../redux/features/book/bookApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Button, Row } from "antd";
import BookForm from "../../components/form/BookForm";
import BookInput from "../../components/form/BookInput";

// @ts-ignore
const EditBook = ({ editId, isVariant }) => {

    const navigate = useNavigate();

    const { data } = useGetAllBooksQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    console.log(data?.data?.data?.books);
    const booksData = data?.data?.data?.books;
    
// @ts-ignore
    const filteredData = booksData.filter(book => book._id === editId)
    console.log(filteredData);
    const [editBook] = useEditBookMutation();
    const [variantBook] = useVariantBookMutation();

    const onSubmit = async (data: FieldValues) => {
        console.log(data);
        const toastId = toast.loading('Edit Book in Inventory');
        
        try {
            const bookInfo = {
                _id: editId,
                name: data.name,
                image: data?.image,
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
            console.log(bookInfo,isVariant);
            const res = isVariant ? await variantBook(bookInfo).unwrap() : await editBook(bookInfo).unwrap();
            console.log(res); 
    
            toast.success(`Book ${isVariant ? 'created' : 'Edited'} Successfully`, { id: toastId, duration: 2000 });
            navigate(`/admin`);
        } catch (err) {
            toast.error('Something went wrong', { id: toastId, duration: 2000 });
        }
    };

    return (
        <>
            <h1 style={{ marginBottom: '20px' }}>{isVariant ? 'Create Variant' : 'Edit'} a book</h1>
            <Row justify="center" align="middle" style={{ height: '100vh' }}>
                <BookForm onSubmit={onSubmit} defaultValues={{
                    name: filteredData[0]?.name,
                    image: filteredData[0]?.image,
                    price: filteredData[0]?.price,
                    quantity: filteredData[0]?.quantity,
                    releaseDate: filteredData[0]?.releaseDate,
                    author: filteredData[0]?.author,
                    isbn: filteredData[0]?.isbn,
                    genre: filteredData[0]?.genre,
                    publisher: filteredData[0]?.publisher,
                    series: filteredData[0]?.series,
                    language: filteredData[0]?.language,
                }}>
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
                    <Button htmlType="submit">{isVariant ? 'Create Variant' : 'Edit'} Book</Button>
                </BookForm>
            </Row>
        </>
    );
};

export default EditBook;