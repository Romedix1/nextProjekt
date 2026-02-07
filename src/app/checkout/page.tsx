'use client';

import { useState, FormEvent } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items, cartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('blik');
  const handlePayment = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
  };
  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-2">Dziękujemy za zamówienie!</h2>
        <p className="text-gray-600 mb-8">Twoje perfumy wkrótce wyruszą w drogę.</p>
        <Link href="/" className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition">
          Wróć na stronę główną
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Twój koszyk jest pusty</h2>
        <Link href="/" className="text-blue-600 underline mt-4 block">Wróć do sklepu</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Finalizacja zamówienia</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div className="space-y-8">
          <form id="checkout-form" onSubmit={handlePayment}>
            
            <div className="bg-white p-6 border rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4">1. Dane kontaktowe</h2>
              <div className="space-y-4">
                <input required type="email" placeholder="Adres e-mail" className="w-full border p-3 rounded focus:ring-2 focus:ring-black focus:outline-none" />
                <input required type="tel" placeholder="Numer telefonu" className="w-full border p-3 rounded focus:ring-2 focus:ring-black focus:outline-none" />
              </div>
            </div>

            <div className="bg-white p-6 border rounded-lg shadow-sm mt-6">
              <h2 className="text-xl font-semibold mb-4">2. Adres dostawy</h2>
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="Imię" className="border p-3 rounded w-full" />
                <input required type="text" placeholder="Nazwisko" className="border p-3 rounded w-full" />
              </div>
              <input required type="text" placeholder="Ulica i numer domu" className="w-full border p-3 rounded mt-4" />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <input required type="text" placeholder="Kod pocztowy" className="border p-3 rounded w-full" />
                <input required type="text" placeholder="Miasto" className="border p-3 rounded w-full" />
              </div>
            </div>

            <div className="bg-white p-6 border rounded-lg shadow-sm mt-6">
              <h2 className="text-xl font-semibold mb-4">3. Metoda płatności</h2>
              <div className="space-y-3">
                
                <label className={`flex items-center p-4 border rounded cursor-pointer transition ${paymentMethod === 'blik' ? 'border-black bg-gray-50 ring-1 ring-black' : 'hover:border-gray-400'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="blik" 
                    checked={paymentMethod === 'blik'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <span className="font-medium">BLIK</span>
                  <span className="ml-auto text-sm text-gray-500">Szybka płatność</span>
                </label>

                <label className={`flex items-center p-4 border rounded cursor-pointer transition ${paymentMethod === 'card' ? 'border-black bg-gray-50 ring-1 ring-black' : 'hover:border-gray-400'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="card" 
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <span className="font-medium">Karta płatnicza</span>
                  <span className="ml-auto text-sm text-gray-500">Visa / Mastercard</span>
                </label>

                 <label className={`flex items-center p-4 border rounded cursor-pointer transition ${paymentMethod === 'paypo' ? 'border-black bg-gray-50 ring-1 ring-black' : 'hover:border-gray-400'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    value="paypo" 
                    checked={paymentMethod === 'paypo'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <span className="font-medium">PayPo</span>
                  <span className="ml-auto text-sm text-gray-500">Kup teraz, zapłać za 30 dni</span>
                </label>
              </div>
            </div>

          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg border sticky top-24">
            <h3 className="text-lg font-bold mb-4 border-b pb-4">Twoje zamówienie</h3>
            
            <div className="space-y-4 mb-6 max-h-60 overflow-auto">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-white border rounded relative shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover rounded p-1" />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.price} zł</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span>Wartość koszyka</span>
                <span>{cartTotal.toFixed(2)} zł</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Dostawa</span>
                <span className="text-green-600 font-medium">Za darmo</span>
              </div>
            </div>

            <div className="flex justify-between text-xl font-bold mt-4 border-t pt-4">
              <span>Do zapłaty</span>
              <span>{cartTotal.toFixed(2)} zł</span>
            </div>

            <button 
              type="submit" 
              form="checkout-form"
              disabled={isProcessing}
              className="w-full bg-black text-white py-4 rounded-lg mt-6 font-bold text-lg hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Przetwarzanie...
                </>
              ) : (
                'Kupuję i płacę'
              )}
            </button>

            <p className="text-xs text-center text-gray-500 mt-4">
              Klikając przycisk, akceptujesz <span className="underline cursor-pointer">Regulamin</span> sklepu.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}