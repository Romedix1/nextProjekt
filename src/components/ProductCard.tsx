"use client";
import React from 'react';
import Link from 'next/link'; 

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
        <img 
          src={image} 
          alt={name} 
          style={{ width: '100%', height: '200px', objectFit: 'cover', cursor: 'pointer' }} 
        />
      </Link>

      <h3 style={{ margin: '10px 0' }}>{name}</h3>
      <p>{price} zł</p>
      
      <button onClick={() => alert('Dodano!')}>Dodaj do koszyka</button>
    </div>
  );
};

export default ProductCard;