'use client';

import { Package } from "lucide-react";

const ToyCardSkeleton = () => (
  <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-xl shadow-lg border border-slate-200/50 overflow-hidden">
    {/* Image skeleton */}
    <div className="h-56 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center skeleton-shimmer">
      <div className="text-center text-slate-400">
        <Package className="w-12 h-12 mx-auto mb-2 opacity-30" />
        <div className="w-16 h-3 bg-slate-300 rounded mx-auto skeleton-shimmer"></div>
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

const HeaderSkeleton = () => (
  <div className="text-center mb-12">
    <div className="h-10 bg-slate-300 rounded w-64 mx-auto mb-4 skeleton-shimmer"></div>
    <div className="h-5 bg-slate-300 rounded w-80 mx-auto mb-6 skeleton-shimmer"></div>
  </div>
);

const ProductCountSkeleton = () => (
  <div className="flex items-center justify-center mb-8">
    <div className="w-4 h-4 bg-slate-300 rounded mr-2 skeleton-shimmer"></div>
    <div className="h-4 bg-slate-300 rounded w-32 skeleton-shimmer"></div>
  </div>
);

export default function ToyPageSkeleton({ cardCount = 12 }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header Skeleton */}
        <HeaderSkeleton />
        
        {/* Product count skeleton */}
        <ProductCountSkeleton />

        {/* Grid of Loading Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(cardCount)].map((_, index) => (
            <ToyCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}