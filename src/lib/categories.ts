import { createClient } from "./supabase/server";

export const CATEGORY_DATA: Record<string, { title: string; desc: string; id: number }> = {
    'mezczyzni': {
        id: 1,
        title: 'Dla Mężczyzn',
        desc: 'Wyraziste, silne i zdecydowane zapachy.'
    },
    'kobiety': {
        id: 2,
        title: 'Dla Kobiet',
        desc: 'Zmysłowe, delikatne i kwiatowe kompozycje.'
    },
    'unisex': {
        id: 3,
        title: 'Unisex',
        desc: 'Uniwersalne zapachy, które nie znają granic.'
    }
};

export async function getProductsByCategory(slug: string) {
    const category = CATEGORY_DATA[slug];
    if (!category) return [];

    const supabase = await createClient();
    const { data } = await supabase.from("products").select("id, name, price, image_url, description").eq("category_id", category.id);

    return data || [];
}