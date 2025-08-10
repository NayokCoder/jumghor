"use client";

import { fetchToys } from "@/app/Lib/hooks/useToys";
import { ArrowLeft, Shield, Truck } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import ProductPageSkeleton from "@/app/Components/Loading/ProductPageSkeleton";

const Page = ({ params }) => {
  const { product_id } = React.use(params);
  const toyId = product_id;

  const [toy, setToy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch toy data after mount
  useEffect(() => {
    const loadToy = async () => {
      try {
        console.log("Fetching toys...");
        const toys = await fetchToys();

        const foundToy = toys.find((item) => item.product_id === toyId);

        if (!foundToy) {
          console.error(`Toy with ID ${toyId} not found`);
          return;
        }
        setToy(foundToy);
      } catch (error) {
        console.error("Error fetching toy:", error);
      } finally {
        // Simulate loading delay
        setTimeout(() => setIsLoading(false), 1000);
      }
    };

    loadToy();
  }, [toyId]);

  const handleAddToCart = (quantity = 1) => {
    console.log(`Added ${quantity} of`, toy, "to cart");
  };

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    console.log("Toggled favorite:", toy);
  };

  if (isLoading) {
    return <ProductPageSkeleton />;
  }

  if (!toy) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-semibold">Toy not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-200/60">
          <div className="flex items-center justify-between">
            {/* Back button + breadcrumb */}
            <div className="flex items-center gap-4">
              <Link href="/all-toys" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
                <ArrowLeft className="w-4 h-4" />
                Back to All Toys
              </Link>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link href="/" className="hover:text-indigo-600 font-medium transition-colors">
                  Home
                </Link>
                <span className="text-gray-400">•</span>
                <Link href="/all-toys" className="hover:text-indigo-600 font-medium transition-colors">
                  All Toys
                </Link>
                <span className="text-gray-400">•</span>
                <span className="text-gray-900 font-semibold">{toy.name}</span>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700">Secure</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                <Truck className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Fast Ship</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 mb-12">
          {/* Images */}
          <div className="xl:col-span-3">
            <ProductImage toy={toy} />
          </div>

          {/* Info */}
          <div className="xl:col-span-2">
            <ProductInfo toy={toy} onAddToCart={handleAddToCart} onToggleFavorite={handleToggleFavorite} isFavorite={isFavorite} />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
          <ProductTabs toy={toy} />
        </div>
      </div>
    </div>
  );
};

export default Page;
