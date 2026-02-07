'use client';

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Twój koszyk jest pusty</h1>
        <Link href="/" className="text-blue-600 hover:underline">Wróć do sklepu</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Twój Koszyk</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 border p-4 rounded-lg">
              <div className="w-24 h-24 bg-gray-100 rounded-md"></div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-500">Ilość: {item.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{item.price} PLN</p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm mt-2 hover:underline"
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Podsumowanie</h2>
          <div className="flex justify-between mb-2">
            <span>Wartość produktów</span>
            <span>{cartTotal.toFixed(2)} PLN</span>
          </div>
          <div className="flex justify-between mb-4 border-b pb-4">
            <span>Dostawa</span>
            <span>0.00 PLN</span>
          </div>
          <div className="flex justify-between text-xl font-bold mb-6">
            <span>Razem</span>
            <span>{cartTotal.toFixed(2)} PLN</span>
          </div>
          <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 font-bold">
            PRZEJDŹ DO PŁATNOŚCI
          </button>
        </div>
      </div>
    </div>
  );
}