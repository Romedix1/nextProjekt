'use server'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithEmail(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error: supabaseError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })

    if (supabaseError) {
        return { error: supabaseError.message };
    }

    redirect('/')
}