import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-9xl font-extrabold text-gray-100 select-none">
        404
      </h1>
      <div className="-mt-1 relative z-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ups… chyba ktoś za dużo psiknął i strona wyparowała.
        </h2>
        
        <p className="text-gray-600 max-w-md mx-auto mb-8">
          Wygląda na to, że strona, której szukasz, nie istnieje. 
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="px-8 py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition-colors"
          >
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    </div>
  )
}