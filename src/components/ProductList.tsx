
import React from 'react';
import ProductCard from './ProductCard';
import { createClient } from '@/lib/supabase/server';
import { Product } from '@/types/product';

const ProductList = async () => {
  const supabase = await createClient()

  const { data: products } = await supabase.from("products").select("id, name, price, image_url").eq("is_bestseller", true)

  if (!products || products.length === 0) {
    return <p className="text-center p-10">Brak bestsellerów do wyświetlenia</p>;
  }

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