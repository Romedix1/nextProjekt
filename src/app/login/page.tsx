"use client";

import Link from "next/link";
import { useState } from "react";
import { signInWithEmail } from "./actions";
import ErrorBlock from "@/components/ErrorBlock";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setError(null)
    const result = await signInWithEmail(formData)

    if (result?.error) {
      setError(result.error)
    } else {
      window.location.href = "/"
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Zaloguj się
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Lub <Link href="/register" className="font-medium text-black hover:underline">załóż nowe konto</Link>
          </p>
        </div>

        <form action={handleSubmit} className="mt-8 space-y-6" >
          <div className="rounded-md shadow-sm space-y-4">
            
            <div>
              <label htmlFor="email-address" className="sr-only">Adres email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Adres email"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Hasło</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Hasło"
              />
            </div>
            {error && (
              <ErrorBlock error={error} />
            )}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
            >
              Zaloguj się
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}