import ProductList from "../components/ProductList";
import MainPageVideo from "@/components/MainPageVideo";
export default function Home() {
  return (
    <div>
      <MainPageVideo /> 
      <div id="bestsellers" className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Nasze Bestsellery</h2>
          <p className="mt-4 text-gray-500 text-lg">Wybierz zapach, który podkreśli Twój styl</p>
        </div>
      
      <ProductList />
      </div>
    </div>
  );
}