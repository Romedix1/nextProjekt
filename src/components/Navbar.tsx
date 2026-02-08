import { getUser } from "@/lib/getUser";
import Link from "next/link";
import Image from "next/image";
import CartSidebar from "@/components/CartSideBar";
import LogoutButton from "./ui/LogoutButton";

export default async function Navbar() {
  const user = await getUser();
  const isAuthenticated = !!user;


  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900 hover:text-gray-700 transition">
            <Image src="/images/logo.png" alt="logo" width={150} height={50} />
          </Link>
            <div className="flex items-center space-x-4">
                <Link href="/mezczyzni" className=" font-medium text-gray-700 hover:text-black transition">
                 Dla mężczyzn
               </Link>
               <Link href="/kobiety" className=" font-medium text-gray-700 hover:text-black transition">
                 Dla kobiet
               </Link>
               <Link href="/unisex" className=" font-medium text-gray-700 hover:text-black transition">
                 Unisex
               </Link>
            </div>
          <div className="flex items-center space-x-6">
              {!isAuthenticated ? (
                <Link href="/login" className=" font-medium text-gray-700 hover:text-black transition">
                  Zaloguj
                </Link>
              ) : (
                <LogoutButton userName={user?.user_metadata.first_name} />
              )}


            <CartSidebar />
          </div>
        </div>
      </div>
    </nav>
  );
};