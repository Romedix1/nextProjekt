
import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products'; 

const ProductList = () => {
  return (
    <div style={{ display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
      gap: '20px', 
      padding: '20px' }}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id} 
          name={product.name}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
};

export default ProductList;