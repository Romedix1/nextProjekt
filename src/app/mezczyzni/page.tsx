import ProductList from "@/components/ProductList";

// Zrób tu żeby z bazy pobierało tylko dla mężczyzn

export default function MenPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Dla Mężczyzn
        </h1>
        <p className="mt-4 text-gray-500">
          Wyraziste, silne i zdecydowane zapachy.
        </p>
      </div>
        <ProductList/>
      </div>
  );
}