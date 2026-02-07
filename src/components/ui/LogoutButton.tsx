"use client"

import { signOut } from "@/app/auth/actions";

export default function LogoutButton({ userName }: { userName: string }) {
  const handleLogout = async () => {
    await signOut()
    window.location.href = "/"
  };

  return (
    <form action={handleLogout}>
      <button onClick={handleLogout} className="font-medium text-gray-700 hover:text-black cursor-pointer duration-200">Wyloguj ({userName})</button>
    </form>
  );
}