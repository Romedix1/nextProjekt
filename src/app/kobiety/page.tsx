import ProductList from "@/components/ProductList";

// Zrób tu żeby z bazy pobierało tylko dla kobiet

export default function WomenPage() {

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Dla Kobiet
        </h1>
        <p className="mt-4 text-gray-500">
          Zmysłowe, delikatne i kwiatowe kompozycje.
        </p>
      </div>
        <ProductList/>
      </div>
  );
}