import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from './ReviewIrem/ReviewItem';

//4.50min

const Orders = () => {
    const { products, initial_cart } = useLoaderData();
    const [cart, set_cart] = useState(initial_cart)

    const handle_remove_item = (id) => {
        const remaning_cart = cart.filter(product => product._id !== id);
        set_cart(remaning_cart);
        removeFromDb(id);
    };

    const clear_cart = () => {
        set_cart([]);
        deleteShoppingCart();
    };


    return (
        <div className='shop_container'>
            <div className='orders_container container'>
                {
                    cart.map(product => <ReviewItem key={product._id} product={product} handle_remove_item={handle_remove_item}></ReviewItem>)
                }
                {
                    cart.length === 0 && <h1>Cart is empty <Link to='/'>Shop more</Link></h1>
                }
            </div>
            <div className='cart_container'>
                <Cart clear_cart={clear_cart} cart={cart}>
                    <Link to='/shipping'>
                        <button>Prossid Shipping</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;