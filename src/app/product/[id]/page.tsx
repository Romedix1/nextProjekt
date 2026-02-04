import { products } from "@/data/products";
import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: productId } = await params;

  const supabase = await createClient()

  const { data: product , error } = await supabase.from("products").select("id, name, price, description, image_url").eq("id", productId).single()

  if (!product || error) {
    return notFound();
  }

  const p = product as Product

  return (

    <div className="max-w-5xl bg-white mx-auto p-6">
      
      <Link href="/" className="text-gray-500 hover:text-black transition-colors mb-6 inline-block">
        ← Wróć do sklepu
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        
        <div className="bg-gray-100 rounded-xl overflow-hidden shadow-sm relative h-150">
          <Image
            src={p.image_url}
            alt={p.name}
            fill
            priority
            className="object-cover"
            sizes="100vw, 50vw"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-900">
            {p.name}
          </h1>
          
          <h2 className="text-3xl text-red-600 font-semibold my-4">
            {p.price} zł
          </h2>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            {p.description}
          </p>

          <button className="mt-8 px-10 py-4 bg-black text-white text-lg font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-lg w-full sm:w-auto">
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </div>
  );
}