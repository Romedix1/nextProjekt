import { createClient } from "@/lib/supabase/server";
import ProductList from "../components/ProductList";
import MainPageVideo from "@/components/MainPageVideo";
import { useCart } from "@/context/CartContext";

export default async function Home() {
  const supabase = await createClient()

  const { data: products } = await supabase.from("products").select("id, name, price, image_url").eq("is_bestseller", true)

  if (!products || products.length === 0) {
    return <p className="text-center p-10">Brak bestsellerów do wyświetlenia</p>;
  }

  return (
    <div>
      <MainPageVideo /> 
      <div id="bestsellers" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Nasze Bestsellery</h2>
          <p className="mt-4 text-gray-500 text-lg">Wybierz zapach, który podkreśli Twój styl</p>
        </div>
      
      <ProductList products={products} />
      </div>
    </div>
  );
}