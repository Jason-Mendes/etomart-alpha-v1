import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/firebaseServices'; // Adjust the path as necessary
import Product from './Product';

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        };

        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                {products.map(product => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Products;

