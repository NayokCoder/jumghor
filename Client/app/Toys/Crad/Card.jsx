"use client";

import { useState } from "react";
import Image from "next/image";
import postAllproduct from "@/app/Lib/postAllproduct";

const initialToys = await postAllproduct();
console.log("Initial Toys Data:", initialToys);

const productsData = {
  "New Arrivals": [
    {
      name: "V-Neck Pure Cotton T-Shirt",
      price: "$39",
      image: "/images/tshirt.jpg",
      label: "HOT",
      discount: null,
      countdown: null,
    },
    {
      name: "Polarized Sunglasses",
      price: "$49",
      image: "/images/sunglasses.jpg",
      label: null,
      discount: "-20%",
      countdown: null,
    },
    {
      name: "Ramie Shirt With Pockets",
      price: "$59",
      image: "/images/orange-shirt.jpg",
      label: null,
      discount: "-44%",
      countdown: "86D : 07H : 12M : 23S",
    },
    {
      name: "Shoulder Straps Fitted Top",
      price: "$29",
      image: "/images/tank-top.jpg",
      label: null,
      discount: null,
      countdown: null,
    },
  ],
  "Best Seller": [],
  "On Sale": [],
};

export default function Card() {
  const [activeTab, setActiveTab] = useState("New Arrivals");

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Tabs */}
      <div className="flex items-center justify-center gap-8 mb-8 text-lg font-medium">
        {Object.keys(productsData).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-1 border-b-2 ${activeTab === tab ? "border-black text-black" : "border-transparent text-gray-400 hover:text-black"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {productsData[activeTab].map((product, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group relative">
            <div className="relative">
              {/* Product Image */}
              <Image src={product.image} alt={product.name} width={400} height={500} className="w-full h-64 object-cover" />

              {/* Label Badge */}
              {product.label && <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">{product.label}</span>}

              {/* Discount Badge */}
              {product.discount && <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">{product.discount}</span>}

              {/* Icons */}
              <div className="absolute top-12 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
                <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">❤️</button>
                <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">🔗</button>
              </div>

              {/* Countdown */}
              {product.countdown && <div className="absolute bottom-0 left-0 w-full bg-white/90 text-red-500 text-xs font-bold text-center py-1">{product.countdown}</div>}
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-sm font-medium">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.price}</p>
            </div>

            {/* Add to Cart */}
            <button className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-gray-800 text-white text-sm px-6 py-2 rounded-full">Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}
