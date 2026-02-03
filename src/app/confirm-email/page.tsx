'use client'

import Link from "next/link";

export default function ConfirmEmailPage() {
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
        
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-8 h-8 text-black"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Sprawdź swoją skrzynkę
        </h2>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Wysłaliśmy link aktywacyjny na Twój adres e-mail. <br className="hidden sm:block"/>
          Kliknij go, aby dokończyć rejestrację i zalogować się do sklepu.
        </p>

        <div className="space-y-4">
          
          <Link 
            href="/login" 
            className="block w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 transition shadow-md"
          >
            Wróć do logowania
          </Link>

          <p className="text-sm text-gray-500 mt-4">
            Nie otrzymałeś wiadomości?{' '}
          </p>

        </div>
      </div>
    </div>
  );
}