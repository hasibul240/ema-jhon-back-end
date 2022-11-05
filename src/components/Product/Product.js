import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import './product.css';

const Product = (props) => {

    const { handle_add_to_cart,product} = props;
    const { name, img, seller, price, ratings, } = product;
    

    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product_info'>
                <p className='product_name'>{name}</p>
                <p>Price:${price}</p>
                <p><small>Seller:{seller}</small></p>
                <p><small>Rating:{ratings}</small></p>
            </div>
            <button onClick={()=>{handle_add_to_cart(props.product)}} className='btn_cart'>
                <p className='btn_text'>Add to Cart</p>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;