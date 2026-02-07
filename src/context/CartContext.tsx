"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import Cookies from "js-cookie";
import { createClient } from "@/lib/supabase/client";

export type CartItem = {
  id?: string | number;
  product_id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  user_id?: string;
}

type BasketRow = {
  id: string;
  user_id: string;
  product_id: string | number;
  quantity: number;
}

type CartContextType = {
  items: CartItem[];
  isLoaded: boolean;
  addToCart: (newItem: Partial<CartItem> & { id: string | number }) => Promise<void>;
  removeFromCart: (productId: string | number) => Promise<void>;
  loadCart: (forcedUserId?: string) => Promise<void>;
  isCartOpen: boolean;
  toggleCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const supabase = createClient()

  const isFetching = useRef(false)
  const lastProcessingId = useRef<string | null>(null)
  const lastProcessingTime = useRef<number>(0)

  const toggleCart = () => setIsCartOpen(!isCartOpen)

  const loadCart = async (userId?: string) => {
    if (isFetching.current) return
    isFetching.current = true

    try {
      if (!userId) {
        const { data } = await supabase.auth.getUser()
        userId = data.user?.id
      }

      if (!userId) {
        const saved = Cookies.get("basket")
        setItems(saved ? JSON.parse(saved) : [])
        return
      }

      const { data: basketData, error: basketError } = await supabase.from("basket").select("*").eq("user_id", userId)

      if (basketError) throw basketError

      if (basketData && basketData.length > 0) {
        const productIds = basketData.map(item => item.product_id)
        const { data: productsData } = await supabase.from("products").select("*").in("id", productIds)

        const groupedCart = basketData.reduce((acc: CartItem[], curr: BasketRow) => {
          const productInfo = productsData?.find(p => p.id === curr.product_id)
          const pId = String(curr.product_id)

          const existingIdx = acc.findIndex(i => String(i.product_id || i.id) === pId)

          if (existingIdx > -1) {
            acc[existingIdx].quantity += (curr.quantity || 1)
          } else {
            acc.push({ ...curr, name: productInfo?.name || "Produkt", price: productInfo?.price || 0, image: productInfo?.image || "" })
          }
          return acc
        }, [])

        setItems(groupedCart)
      } else {
        setItems([])
      }
    } catch (err) {
      // console.error(err)
    } finally {
      isFetching.current = false
      setIsLoaded(true)
    }
  }

  const syncCartAfterLogin = async (userId: string) => {
    const guestCartRaw = Cookies.get("basket")
    if (!guestCartRaw) return

    try {
      const guestItems: CartItem[] = JSON.parse(guestCartRaw)

      if (guestItems.length > 0) {
        const itemsToInsert = guestItems.map((item) => ({
          user_id: userId,
          product_id: item.product_id || item.id,
          quantity: item.quantity || 1
        }))

        await supabase.from("basket").insert(itemsToInsert)
        Cookies.remove("basket")
      }
    } catch (err) {
      // console.error(err)
    }
  }

  useEffect(() => {
    const checkInitialAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      await loadCart(session?.user?.id)
    }

    checkInitialAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        if (session?.user) {
          await syncCartAfterLogin(session.user.id)
          await loadCart(session.user.id)
        }
      }

      if (event === 'SIGNED_OUT') {
        setItems([])
        await loadCart()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const addToCart = async (newItem: Partial<CartItem> & { id: string | number }) => {
      const pId = String(newItem.product_id || newItem.id)
      const now = Date.now()

      if (lastProcessingId.current === pId && (now - lastProcessingTime.current) < 300) return
      lastProcessingId.current = pId
      lastProcessingTime.current = now

      setItems((prev) => {
        const existingIdx = prev.findIndex((i) => String(i.product_id) === pId)
        if (existingIdx > -1) {
          const newItems = [...prev]
          newItems[existingIdx] = { ...newItems[existingIdx], quantity: (newItems[existingIdx].quantity || 0) + 1 }
          return newItems
        }
        const itemToAdd: CartItem = {
          product_id: pId,
          name: newItem.name || "Produkt",
          price: newItem.price || 0,
          image: newItem.image || "",
          quantity: 1
        }
        return [...prev, itemToAdd]
      })

      setIsCartOpen(true)

      try {
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
          const { data: existing } = await supabase.from("basket").select("id, quantity").eq("user_id", user.id).eq("product_id", pId).maybeSingle()

          if (existing) {
            await supabase.from("basket").update({ quantity: existing.quantity + 1 }).eq("id", existing.id)
        } else {
          await supabase.from("basket").insert([{ product_id: pId, user_id: user.id, quantity: 1 }])
        }
      } else {
        const currentCookie = Cookies.get("basket")
        const cart: CartItem[] = currentCookie ? JSON.parse(currentCookie) : []
        const exIdx = cart.findIndex((i) => String(i.product_id || i.id) === pId)
        if (exIdx > -1) {
          cart[exIdx].quantity += 1
        } else {
          cart.push({
            product_id: pId,
            name: newItem.name || "Produkt",
            price: newItem.price || 0,
            image: newItem.image || "",
            quantity: 1
          })
        }
        Cookies.set("basket", JSON.stringify(cart), { expires: 7 })
      }
    } catch (err) {
      // console.error(err)
    }
  }

  const removeFromCart = async (productId: string | number) => {
    const pId = String(productId)
    setItems((prev) => prev.filter((i) => String(i.product_id) !== pId))

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from("basket").delete().eq("product_id", pId).eq("user_id", user.id)
      } else {
        const current = Cookies.get("basket")
        if (current) {
          const updated = JSON.parse(current).filter((i: CartItem) => String(i.product_id || i.id) !== pId)
          Cookies.set("basket", JSON.stringify(updated), { expires: 7 })
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const cartCount = items.reduce((total, item) => total + (item.quantity || 0), 0)
  const cartTotal = items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)

  return (
    <CartContext.Provider value={{ items, isLoaded, addToCart, removeFromCart, loadCart, isCartOpen, toggleCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}