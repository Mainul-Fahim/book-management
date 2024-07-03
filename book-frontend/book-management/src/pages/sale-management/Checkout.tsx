import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addItem, decreaseQuantity, removeCart, selectCart } from '../../redux/features/cart/cartSlice';
import { Button } from 'antd';
import { useAddCartMutation } from '../../redux/features/book/bookApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


// styles


const inputStyle = {
    marginBottom: '10px',
    padding: '5px'
};

const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
};

const cartDetailsStyle = {
    width: '70%',
};

const cartTotalStyle = {
    width: '30%',
    marginTop: '30px',
    marginLeft: '30px',
    height: '130px',
};

const cartListStyle = {
    background: 'white',
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};



const cartItemsFunctionStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
    marginLeft: '20%'
};

const cartControlStyle = {
    display: 'flex',
    marginTop: '50px',
};

const incCartStyle = {
    background: 'none',
    border: '1px solid rgb(3 0 71 / 9%)',
    color: '#e94560',
    cursor: 'pointer',
    width: '40px',
    height: '40px',
    margin: '10px',
    borderRadius: '5px',
    fontSize: '20px',
};

const desCartStyle = {
    background: '#f6f9fc',
    border: '1px solid rgb(3 0 71 / 9%)',
    cursor: 'pointer',
    width: '40px',
    height: '40px',
    margin: '10px',
    borderRadius: '5px',
    fontSize: '20px',
};

const cartTotalH4Style = {
    fontSize: '20px',
    fontWeight: '400',
};

const cartTotalH3Style = {
    fontSize: '20px',
    fontWeight: '500',
    color: '#e94560',
    marginRight: '20%'
};

const cartTotalH2Style = {
    fontSize: '18px',
    marginBottom: '20px',
    borderBottom: '1px solid rgb(3 0 71 / 9%)',
    paddingBottom: '10px',
    color: '#e94560',
};

const noItemsStyle = {
    color: '#e94560',
    fontSize: '18px',
    marginTop: '30px',
    height: '130px',
};

// const buttonStyle = {
//     width: '30px',
//     height: '30px',
//     margin: '0 5px',
//     borderRadius: '5px',
//     fontSize: '16px',
//     backgroundColor: '#337ab7',
//     color: 'white',
//     cursor: 'pointer',
//   };


const Checkout = () => {


    const dispatch = useAppDispatch();

    const cart = useAppSelector(selectCart);

    console.log(cart);

    const [buyerName, setBuyerName] = useState('');
    const [contact, setContact] = useState('');
    const [saleDate, setSaleDate] = useState('');

    const handleIncreaseQuantity = (item: any) => {

        if (item?.qty >= item?.quantity) {
            return alert("sorry out of stock")
        }
        dispatch(addItem(item));
    };

    const handleDecreaseQuantity = (itemId: string) => {

        dispatch(decreaseQuantity(itemId));
    };


    const [addCart] = useAddCartMutation();
    const navigate = useNavigate();

    const handleCheckout = async () => {

        const cartData = {
            cart: cart,
            buyerName: buyerName,
            contact: contact,
            saleDate: saleDate,
        }

        if (buyerName && contact && saleDate) {
            console.log(cartData);
            const toastId = toast.loading('Cart added in Inventory');

            try {

                const res = await addCart(cartData).unwrap();
                console.log(res);
                toast.success('Cart added Successfully', { id: toastId, duration: 2000 });
                dispatch(removeCart(null))
                navigate(`/admin/book-list`);
            } catch (err) {
                toast.error('Something went wrong', { id: toastId, duration: 2000 });
            }

        }

        else {
            return alert("please complete all steps")
        }

    };


    // Calculate total price
    const totalPrice = cart?.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2);





    return (

        <section style={{ background: '#f6f9fc', height: 'auto', padding: '50px 0' }}>
            <div style={containerStyle}>
                <div style={cartDetailsStyle}>
                    {cart.length === 0 && <h1 style={noItemsStyle}>No Items are added in the Cart</h1>}

                    {cart?.map((item) => {
                        const productQty = item?.price * item?.qty;
                        return (

                            <div key={item._id} style={cartListStyle}>
                                <div style={{ marginLeft: '20%' }}>
                                    <h3 style={{ width: '100%' }}>{item?.name}</h3>
                                    <h4 style={{ marginTop: '20px' }}>
                                        Price * Qty

                                    </h4>
                                    <h4 style={{ marginTop: '20px' }}>
                                        ৳{item?.price}.00 * {item?.qty}
                                        <br />
                                        <span>Total</span>
                                        <span style={{ marginLeft: '20%' }}>৳{productQty}.00</span>
                                    </h4>
                                </div>


                                <div style={cartItemsFunctionStyle}>
                                    <div style={cartControlStyle}>
                                        <button style={incCartStyle} onClick={() => handleIncreaseQuantity(item)}>
                                            <span style={{color: 'red'}}>+</span>
                                        </button>
                                        <button style={desCartStyle} onClick={() => handleDecreaseQuantity(item._id)}>
                                            <span style={{color: 'red'}}>-</span>
                                        </button>
                                    </div>
                                </div>
                                <div style={{ height: '0px', width: '100%', borderBottom: '1px solid rgb(3 0 71 / 9%)', margin: '20px 0' }}></div>
                            </div>
                        );
                    })}
                </div>

                <div style={cartTotalStyle}>
                    <h2 style={cartTotalH2Style}>Cart Summary</h2>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <h4 style={cartTotalH4Style}>Total Price :</h4>
                        <h3 style={cartTotalH3Style}>৳{totalPrice}</h3>
                    </div>
                    <div>
                        <h2 style={{ margin: '10px' }}>Checkout Details</h2>
                        <label>
                            Buyer Name:
                            <input type="text" style={inputStyle} value={buyerName} onChange={(e) => setBuyerName(e.target.value)} required />
                            <br />
                        </label>
                        <label>
                            Contact:
                            <input type="text" style={inputStyle} value={contact} onChange={(e) => setContact(e.target.value)} required />
                            <br />
                        </label>
                        <label>
                            Sale Date:
                            <input type="date" style={inputStyle} value={saleDate} onChange={(e) => setSaleDate(e.target.value)} required />
                        </label>
                    </div>
                    <Button style={{ marginTop: '10px', cursor: 'pointer' }} onClick={handleCheckout} className='btn-primary'>
                        Checkout
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Checkout;