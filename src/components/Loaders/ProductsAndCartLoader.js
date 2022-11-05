import { get_stored_data } from "../../utilities/fakedb";

export const ProductsAndCartLoader = async () => {

    const product_data = await fetch('http://localhost:5000/products');
    const {products} = await product_data.json();

    const stored_cart = get_stored_data();
    const initial_cart = [];

    for(const id in stored_cart){
        const added_product = products.find(product => product._id === id);
        if(added_product){
            const quantity = stored_cart[id];
            added_product.quantity = quantity;
            initial_cart.push(added_product);
        }
    }

    return {products, initial_cart};
}