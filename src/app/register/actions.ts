'use server'

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signUpWithEmail(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm-password') as string
    const name = formData.get('firstName') as string

    if (password !== confirmPassword) {
        return { error: "Podane hasła nie są identyczne." };
    }

    const { error: supabaseError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { first_name: name }
        }
    })

    if (supabaseError) {
        return { error: supabaseError.message };
    }

    redirect('/confirm-email')
}