import React from 'react';
import './cart.css';

const Cart = ({ cart, clear_cart, children }) => {


    let total = 0;
    let Shipping = 0;
    let quantity = 0;

    for (const product of cart) {
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        Shipping = Shipping + product.shipping;
    }
    const tax = total * 0.1;
    const grand_total = total + Shipping + tax;

    return (
        <div className='cart'>
            <h3>Order Summary</h3>
            <p>Item selected: {quantity}</p>
            <p>Total Price:$ {total}</p>
            <p>Shipping:$ {Shipping}</p>
            <p>Tax:$ {tax.toFixed(2)}</p>
            <h5>Grand Total:$ {grand_total}</h5>
            <button onClick={clear_cart}>clear cart</button>
            {children}
        </div>
    );
};

export default Cart;