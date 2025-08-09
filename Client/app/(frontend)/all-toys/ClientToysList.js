"use client";

import { fetchToys } from "@/app/Lib/hooks/useToys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Star, ShoppingCart, Eye, Package } from "lucide-react";

const getToys = fetchToys();

const ToyCard = ({ toy }) => {
  // Parse images - handle both array and JSON string formats
  let images = [];
  let firstImage = null;

  if (toy.images) {
    if (Array.isArray(toy.images)) {
      // Already an array
      images = toy.images;
      firstImage = images.length > 0 ? images[0] : null;
    } else if (typeof toy.images === "string") {
      try {
        // Try to parse as JSON array
        const parsed = JSON.parse(toy.images);
        if (Array.isArray(parsed) && parsed.length > 0) {
          images = parsed;
          firstImage = parsed[0];
        }
      } catch (error) {
        // If JSON parsing fails, treat as single URL string
        if (toy.images.startsWith("http")) {
          firstImage = toy.images;
          images = [toy.images];
        }
      }
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-xl shadow-lg border border-slate-200/50 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-300/30">
      <div className="relative">
        {firstImage ? (
          <Image
            src={firstImage}
            alt={toy.title || "Toy Image"}
            width={300}
            height={200}
            className="w-full h-56 object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              const placeholder = e.target.parentNode.querySelector(".image-placeholder");
              if (placeholder) {
                placeholder.style.display = "flex";
              }
            }}
            unoptimized={process.env.NODE_ENV === "development"}
          />
        ) : null}

        {/* Fallback placeholder div */}
        <div className={`image-placeholder w-full h-56 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center ${firstImage ? "hidden" : "flex"}`} style={{ display: firstImage ? "none" : "flex" }}>
          <div className="text-center text-slate-600">
            <Package className="w-12 h-12 mx-auto mb-2 opacity-60 text-slate-400" />
            <p className="text-sm font-medium text-slate-500">No Image Available</p>
          </div>
        </div>
        {toy.discount_price && <div className="absolute top-3 left-3  text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">On Sale</div>}
        <div className="absolute top-3 right-3  backdrop-blur-sm rounded-full p-2 shadow-lg">
          <div className="flex items-center text-white text-sm">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
            <span>{toy.rating || "4.5"}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-md font-bold text-gray-800 line-clamp-2 mb-2">{toy.title}</h3>

          {toy.ages && toy.ages !== "0" && <p className="text-xs text-gray-600 font-medium bg-gray-50 px-2 py-1 rounded-full inline-block">Age: {toy.ages}+</p>}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            {toy.price ? (
              <>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">৳ {toy.price}</span>
                <span className="text-sm text-slate-500 line-through">৳{toy.discount_price}</span>
              </>
            ) : (
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">${toy.discount_price}</span>
            )}
          </div>
          <div className="flex items-center text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
            <Package className="w-4 h-4 mr-1 text-slate-500" />
            <span>{toy.stock || 0} left</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/all-toys/${toy.product_id}`} className="custom-btn-view bg-custon-C1">
            <Eye className="w-4 h-4 " />
            View
          </Link>
          <button className="custom-btn-cart bg-custon-C2">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-xl shadow-lg border border-slate-200/50 overflow-hidden">
    {/* Image skeleton with package icon */}
    <div className="h-56 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center skeleton-shimmer">
      <div className="text-center text-slate-400">
        <Package className="w-12 h-12 mx-auto mb-2 opacity-30" />
        <div className="w-20 h-3 bg-slate-300 rounded mx-auto skeleton-shimmer"></div>
      </div>
    </div>

    <div className="p-5">
      {/* Title and category skeleton */}
      <div className="mb-3">
        <div className="h-5 bg-slate-300 rounded mb-2 skeleton-shimmer"></div>
        <div className="h-3 bg-slate-300 rounded w-1/2 mb-1 skeleton-shimmer"></div>
        <div className="h-3 bg-indigo-200 rounded-full w-1/4 skeleton-shimmer"></div>
      </div>

      {/* Price and stock skeleton */}
      <div className="flex justify-between items-end mb-4">
        <div className="flex flex-col">
          <div className="h-6 bg-gradient-to-r from-emerald-200 to-teal-200 rounded w-20 mb-1 skeleton-shimmer"></div>
          <div className="h-3 bg-slate-300 rounded w-16 skeleton-shimmer"></div>
        </div>
        <div className="flex items-center bg-slate-100 px-2 py-1 rounded-full">
          <div className="w-4 h-4 bg-slate-300 rounded mr-1 skeleton-shimmer"></div>
          <div className="h-3 bg-slate-300 rounded w-12 skeleton-shimmer"></div>
        </div>
      </div>

      {/* Buttons skeleton */}
      <div className="flex gap-2">
        <div className="flex-1 h-8 bg-gradient-to-r from-slate-300 to-slate-400 rounded-lg skeleton-shimmer"></div>
        <div className="flex-1 h-8 bg-gradient-to-r from-indigo-300 to-blue-300 rounded-lg skeleton-shimmer"></div>
      </div>
    </div>
  </div>
);

export default function ClientToysList({ initialToys }) {
  const queryClient = useQueryClient();

  // Pre-populate the cache with initial data from SSR
  useEffect(() => {
    queryClient.setQueryData(["toys"], initialToys);
  }, [initialToys, queryClient]);

  const {
    data: toys,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["toys"],
    queryFn: getToys,
    initialData: initialToys,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  if (isLoading) {
    return (
      <>
        {/* Product count skeleton */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-4 h-4 bg-slate-300 rounded mr-2 skeleton-shimmer"></div>
          <div className="h-4 bg-slate-300 rounded w-32 skeleton-shimmer"></div>
        </div>

        {/* Loading grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Error Loading Toys</h3>
        <p className="text-gray-500 mb-4">{error.message}</p>
        <button onClick={() => refetch()} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <>
      {toys?.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
          <p className="text-gray-500">Check back later for new arrivals!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {toys?.map((toy, index) => (
            <ToyCard key={toy.id || index} toy={toy} />
          ))}
        </div>
      )}
    </>
  );
}
