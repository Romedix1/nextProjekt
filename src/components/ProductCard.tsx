"use client";
import React from 'react';
import Link from 'next/link'; 
import Image from 'next/image';
import { Product } from '@/types/product';
import AddToCartButton from './ui/AddToCartButton';

// Zrób żeby dało się dodać do koszyka

type ProductCardProps = {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border p-4 rounded shadow">
      <Link href={`/product/${product.id}`}>
        <div style={{ position: 'relative', width: '100%', height: '200px', cursor: 'pointer' }}>
            <Image 
              src={product.image_url} 
              alt={product.name} 
              fill
              style={{ objectFit: 'cover' }} 
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
      </Link>

      <h3 style={{ margin: '10px 0' }}>{product.name}</h3>
      <p>{product.price} zł</p>

      <AddToCartButton productId={product.id} name={product.name} price={product.price} image={product.image_url} />
    </div>
  );
};

export default ProductCard;