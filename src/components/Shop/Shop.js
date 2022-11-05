import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, get_stored_data } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {

    // const { products, count } = useLoaderData();
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [cart, set_cart] = useState([]);
    const [page, set_page] = useState(0);
    const [size, set_size] = useState(10);

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setCount(data.count);
                setProducts(data.products);
            })
    }, [page, size]);


    const page_count = Math.ceil(count / size);


    const clear_cart = () => {
        set_cart([]);
        deleteShoppingCart();
    };


    useEffect(() => {
        const stored_cart = get_stored_data();
        const saved_cart = [];

        for (const id in stored_cart) {
            const added_product = products.find(product => product._id === id);
            if (added_product) {
                const quantity = stored_cart[id];
                added_product.quantity = quantity;
                saved_cart.push(added_product);
            }
        }
        set_cart(saved_cart);
    }, [products])

    useEffect(() => {
        const stored_cart = get_stored_data();
        const saved_cart = [];

        for (const id in stored_cart) {
            const added_product = products.find(product => product._id === id);

            if (added_product) {
                const quantity = stored_cart[id];
                added_product.quantity = quantity;
                saved_cart.push(added_product);
            }
        }
        set_cart(saved_cart);
    }, [products])

    const handle_add_to_cart = (selected_product) => {
        const exist_product = cart.find(product => product._id === selected_product._id);
        let new_cart = [];

        if (!exist_product) {
            selected_product.quantity = 1;
            new_cart = [...cart, selected_product];
        } else {
            const rest = cart.filter(product => product._id !== selected_product._id);
            exist_product.quantity = exist_product.quantity + 1;
            new_cart = [...rest, exist_product];
        }

        set_cart(new_cart);
        addToDb(selected_product._id);
    }

    return (
        <div className='shop_container'>
            <div className="products_container container">
                {
                    products.map(product => <Product key={product._id} product={product} handle_add_to_cart={handle_add_to_cart}></Product>)
                }
            </div>
            <div className="cart_container">
                <Cart cart={cart} sample={'working'} clear_cart={clear_cart}>
                    <Link to='/orders'>
                        <button>Review Order</button>
                    </Link>
                </Cart>
            </div>
            <div className='pagination'>
                <p>Currently selected page: {page} : {size}</p>
                {
                    [...Array(page_count).keys()].map(number => <button onClick={() => set_page(number)} className={page === number ? "selected" : ''} key={number}>{number}</button>)
                }
                <select defaultValue='10' onChange={event => set_size(event.target.value)}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;