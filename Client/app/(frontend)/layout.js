import React from "react";
import Navbar from "../Components/Layout/Nvbar/Navbar";
import { CartProvider } from "../Components/Context/CardContext";

export default function Layout({ children }) {
  return (
    <div>
      <CartProvider>
        <Navbar />
        {children}
      </CartProvider>
    </div>
  );
}
