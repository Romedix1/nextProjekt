import { Product } from "@/types/product";
import { createClient } from "./supabase/server"

type getProductsType = {
    category: string
}

export async function getProducts({ category }: getProductsType): Promise<Product[]> {
    const supabase = await createClient()

    const { data, error } = await supabase.from("products").select("id, name, price, image_url").eq("category", true)

    if (error) {
        return [];
    }

    return (data as Product[]) || [];
}