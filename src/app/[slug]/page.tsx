import ProductList from "@/components/ProductList";
import { getProductsByCategory, CATEGORY_DATA } from "@/lib/categories";
import { notFound } from "next/navigation";

type CategoryPageProps = {
    params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;

    const categoryInfo = CATEGORY_DATA[slug];

    if (!categoryInfo) {
        return notFound();
    }

    const products = await getProductsByCategory(slug);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">{categoryInfo.title}</h1>
                <p className="mt-4 text-gray-500">{categoryInfo.desc}</p>
            </div>

            {products.length === 0 ? (
                <p className="p-10 text-center text-gray-500">Obecnie brak produktów w tej kategorii</p>
            ) : (
                <ProductList products={products} />
            )}
        </div>
    );
}