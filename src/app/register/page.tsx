"use client";

import Link from "next/link";

export default function RegisterPage() {
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Załóż konto
          </h1>
        </div>

        <form className="mt-8 space-y-6">
          
          <div className="rounded-md shadow-sm space-y-4">
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Imię
              </label>
              <input 
                id="name"
                type="text" 
                placeholder="Twoje imię"
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm" 
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adres e-mail
              </label>
              <input 
                id="email"
                type="email" 
                placeholder="email@example.pl"
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm" 
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Hasło
              </label>
              <input 
                id="password"
                type="password" 
                placeholder="Minimum 8 znaków"
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm" 
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Powtórz hasło
              </label>
              <input 
                id="confirm-password"
                type="password" 
                placeholder="••••••••"
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black sm:text-sm" 
              />
            </div>

          </div>

          <div>
            <button 
              type="submit" 
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out shadow-md"
            >
              Zarejestruj się
            </button>
          </div>

        </form>

        <p className="mt-2 text-center text-sm text-gray-600">
          Masz już konto? <Link href="/login" className="font-medium text-black hover:underline">Zaloguj się</Link>
        </p>
      </div>
    </div>
  );
}