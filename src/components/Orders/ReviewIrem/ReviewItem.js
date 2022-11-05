import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ReviewItem.css';

const ReviewItem = ({ product, handle_remove_item }) => {
    const { name, quantity, price, img, _id } = product;

    return (
        <div className='review_item'>
            <div className='img'>
                <img src={img} alt="" />
            </div>
            <div className='review_detail_container contiainer'>
                <div className='review_detail'>
                    <p>{name}</p>
                    <p><small>price: ${price}</small></p>
                    <p><small>Quantity: {quantity}</small></p>
                </div>
                <div className='delet_container'>
                    <button onClick={()=>handle_remove_item(_id)}>
                        <FontAwesomeIcon className='delete_icon' icon={faTrashCan} ></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;