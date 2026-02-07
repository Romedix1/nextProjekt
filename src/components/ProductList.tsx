
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

type ProductCardProps = {
  products: Product[];
}

const ProductList = async ({ products }: ProductCardProps) => {
  return (
    <div style={{ display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
      gap: '20px', 
      padding: '20px' }}>
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;