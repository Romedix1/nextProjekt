"use client"

import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface AddToCartProps {
  productId: number;
  name: string;
  price: number;
  image: string;
}

export default function AddToCartButton({ productId, name, price, image }: AddToCartProps) {
    const { addToCart } = useCart()
    const [isAdding, setIsAdding] = useState(false)

    const handleAdd = async () => {
        if (isAdding) return

        setIsAdding(true);

        await addToCart({ id: productId, product_id: productId, name, price, image })

        setTimeout(() => setIsAdding(false), 600);
    }

    return (
        <button onClick={handleAdd} disabled={isAdding} className={`mt-8 px-10 py-4 text-lg font-medium rounded-lg duration-200 w-full transition-all cursor-pointer ${isAdding ? "bg-gray-400 cursor-not-allowed scale-95" : "bg-black text-white hover:bg-gray-800 active:scale-95"}`}>{isAdding ? "Dodawanie..." : "Dodaj do koszyka"}</button>
    )
}