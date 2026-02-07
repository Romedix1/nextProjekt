'use client';

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartSidebar() {
  const { isCartOpen, toggleCart, items, removeFromCart, cartTotal, cartCount } = useCart();

  return (
    <>
      <button 
        onClick={toggleCart} 
        className="relative group text-gray-700 hover:text-black transition flex items-center"
      >
        <span className="text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </span>
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cartCount}
          </span>
        )}
      </button>

      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-60" 
          onClick={toggleCart} 
        />
      )}

      <div className={`fixed top-0 right-0 h-full w-100 bg-white shadow-2xl z-70 transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Twój koszyk ({cartCount})</h2>
          <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full">✕</button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-200px)]">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Koszyk jest pusty.</p>
          ) : (
            items.map((item) => {
              const uniqueId = item.product_id || item.id;

              return (
                <div key={`sidebar-${uniqueId}`} className="flex gap-4 mb-6 border-b pb-4">
                  <div className="w-20 h-20 bg-gray-100 relative">
                    <span className="text-xs flex items-center justify-center h-full">IMG</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-gray-500 text-xs">Ilość: {item.quantity}</p>
                    <p className="font-bold mt-1">{(Number(item.price) || 0).toFixed(2)} PLN</p>
                  </div>
                  <button onClick={() => removeFromCart(item.product_id)} className="text-red-500 text-sm hover:underline">Usuń</button>
                </div>
              )
            }))
          }
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-gray-50 p-4 border-t">
          <div className="flex justify-between mb-4 text-lg font-bold">
            <span>Suma:</span>
            <span>{(Number(cartTotal) || 0).toFixed(2)} PLN</span>
          </div>
          <Link 
            href="/cart" 
            onClick={toggleCart} 
            className="block w-full bg-black text-white text-center py-3 rounded hover:bg-gray-800 transition"
          >
            Przejdź do podsumowania
          </Link>
        </div>
      </div>
    </>
  );
}