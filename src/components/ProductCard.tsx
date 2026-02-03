"use client";
import React from 'react';
import Link from 'next/link'; 
import Image from 'next/image';

interface ProductCardProps {
  id: number;     
  name: string;
  price: number;
  image: string;
}

const ProductCard = ({ id, name, price, image }: ProductCardProps) => {
  return (
    <div className="border p-4 rounded shadow">
      <Link href={`/product/${id}`}>
        <div style={{ position: 'relative', width: '100%', height: '200px', cursor: 'pointer' }}>
            <Image 
              src={image} 
              alt={name} 
              fill
              style={{ objectFit: 'cover' }} 
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
      </Link>

      <h3 style={{ margin: '10px 0' }}>{name}</h3>
      <p>{price} zł</p>
      
      <button onClick={() => alert('Dodano!')}>Dodaj do koszyka</button>
    </div>
  );
};

export default ProductCard;