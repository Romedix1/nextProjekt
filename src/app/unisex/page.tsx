import ProductList from "@/components/ProductList";

// Zrób tu żeby z bazy pobierało perfumy unisex
export default function UnisexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Unisex
        </h1>
        <p className="mt-4 text-gray-500">
          Uniwersalne zapachy dla każdego, bez podziałów.
        </p>
      </div>
        <ProductList/>
      </div>
  );
}