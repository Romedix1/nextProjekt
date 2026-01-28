import { products } from "@/data/products";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  const product = products.find((p) => p.id.toString() === productId);

  if (!product) {
    return notFound();
  }

  return (

    <div className="max-w-5xl bg-white mx-auto p-6">
      
      <Link href="/" className="text-gray-500 hover:text-black transition-colors mb-6 inline-block">
        ← Wróć do sklepu
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
        
        <div className="bg-gray-100 rounded-xl overflow-hidden shadow-sm">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-900">
            {product.name}
          </h1>
          
          <h2 className="text-3xl text-red-600 font-semibold my-4">
            {product.price} zł
          </h2>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            {product.description}
          </p>

          <button className="mt-8 px-10 py-4 bg-black text-white text-lg font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-lg w-full sm:w-auto">
            Dodaj do koszyka
          </button>
        </div>
      </div>
    </div>
  );
}