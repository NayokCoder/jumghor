"use client";
import { createContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
  }, []);

  const addToCart = (item) => {
    const exists = cart.find((p) => p.id === item.id);

    if (exists) {
      toast.error(`${item.title} is already in your cart!`);
    } else {
      const newCart = [...cart, item];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      // toast.success(`${item.title} added to cart!`);
      toast.success(`${item.title} is added in your cart!`);
    }
  };

  return (
    <>
      <CartContext.Provider value={{ cart, addToCart }}>{children}</CartContext.Provider>
      <Toaster position="top-right" reverseOrder={true} />
    </>
  );
}
