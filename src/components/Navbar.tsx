import { signOut } from "@/app/auth/actions";
import { getUser } from "@/lib/getUser";
import Link from "next/link";

export default async function Navbar() {
  const user = await getUser();
  const isAuthenticated = !!user;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 hover:text-gray-700 transition">
            PERFUMY
          </Link>
            <div className="flex items-center space-x-4">
                <Link href="/mezczyzni" className=" font-medium text-gray-700 hover:text-black transition">
                 Dla mężczyzn
               </Link>
               <Link href="/kobiety" className=" font-medium text-gray-700 hover:text-black transition">
                 Dla kobiet
               </Link>
            </div>
          <div className="flex items-center space-x-6">
              {!isAuthenticated ? (
                <Link href="/login" className=" font-medium text-gray-700 hover:text-black transition">
                  Zaloguj
                </Link>
              ) : (
                <form action={signOut}>
                  <button type="submit" className="font-medium text-gray-700 hover:text-black cursor-pointer duration-200">Wyloguj ({user?.user_metadata.first_name})</button>
                </form>
              )}


            <Link href="/cart" className="relative group text-gray-700 hover:text-black transition">
              <span className="text-xl">Koszyk</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};