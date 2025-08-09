"use client";

import { Package, Star, ShoppingCart, Heart, Share2 } from "lucide-react";

const ProductImageSkeleton = () => (
  <div className="space-y-4">
    {/* Main image */}
    <div className="aspect-square bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 rounded-xl flex items-center justify-center skeleton-shimmer">
      <Package className="w-16 h-16 text-slate-400 opacity-30" />
    </div>
    
    {/* Thumbnail images */}
    <div className="flex gap-2 overflow-x-auto">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-20 h-20 bg-slate-200 rounded-lg flex-shrink-0 skeleton-shimmer"></div>
      ))}
    </div>
  </div>
);

const ProductInfoSkeleton = () => (
  <div className="space-y-6">
    {/* Category and rating */}
    <div className="space-y-2">
      <div className="h-4 bg-indigo-200 rounded-full w-24 skeleton-shimmer"></div>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-slate-300" />
          ))}
        </div>
        <div className="h-4 bg-slate-300 rounded w-16 skeleton-shimmer"></div>
      </div>
    </div>

    {/* Title */}
    <div className="space-y-2">
      <div className="h-8 bg-slate-300 rounded w-full skeleton-shimmer"></div>
      <div className="h-8 bg-slate-300 rounded w-3/4 skeleton-shimmer"></div>
    </div>

    {/* Price */}
    <div className="space-y-2">
      <div className="h-10 bg-gradient-to-r from-emerald-200 to-teal-200 rounded w-32 skeleton-shimmer"></div>
      <div className="h-4 bg-slate-300 rounded w-20 skeleton-shimmer"></div>
    </div>

    {/* Stock status */}
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 bg-green-300 rounded-full skeleton-shimmer"></div>
      <div className="h-4 bg-slate-300 rounded w-24 skeleton-shimmer"></div>
    </div>

    {/* Action buttons */}
    <div className="space-y-3">
      <div className="flex gap-3">
        <div className="flex-1 h-12 bg-gradient-to-r from-indigo-300 to-blue-300 rounded-lg skeleton-shimmer"></div>
        <div className="w-12 h-12 bg-slate-300 rounded-lg skeleton-shimmer flex items-center justify-center">
          <Heart className="w-5 h-5 text-slate-400" />
        </div>
        <div className="w-12 h-12 bg-slate-300 rounded-lg skeleton-shimmer flex items-center justify-center">
          <Share2 className="w-5 h-5 text-slate-400" />
        </div>
      </div>
      <div className="h-12 bg-gradient-to-r from-slate-300 to-slate-400 rounded-lg skeleton-shimmer"></div>
    </div>

    {/* Features list */}
    <div className="space-y-3">
      <div className="h-6 bg-slate-300 rounded w-24 skeleton-shimmer"></div>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="w-2 h-2 bg-slate-300 rounded-full skeleton-shimmer"></div>
          <div className="h-4 bg-slate-300 rounded flex-1 skeleton-shimmer"></div>
        </div>
      ))}
    </div>
  </div>
);

const ProductDescriptionSkeleton = () => (
  <div className="mt-12 space-y-6">
    {/* Tab navigation */}
    <div className="flex gap-6 border-b">
      {['Description', 'Specifications', 'Reviews'].map((tab, i) => (
        <div key={i} className="h-10 bg-slate-300 rounded-t w-24 skeleton-shimmer"></div>
      ))}
    </div>

    {/* Content */}
    <div className="space-y-4">
      <div className="h-6 bg-slate-300 rounded w-48 skeleton-shimmer"></div>
      <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`h-4 bg-slate-300 rounded skeleton-shimmer ${i === 5 ? 'w-2/3' : 'w-full'}`}></div>
        ))}
      </div>
    </div>
  </div>
);

const RelatedProductsSkeleton = () => (
  <div className="mt-16 space-y-6">
    <div className="h-8 bg-slate-300 rounded w-48 skeleton-shimmer"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
          <div className="h-40 bg-slate-200 skeleton-shimmer"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-slate-300 rounded w-full skeleton-shimmer"></div>
            <div className="h-4 bg-slate-300 rounded w-2/3 skeleton-shimmer"></div>
            <div className="h-6 bg-emerald-200 rounded w-20 skeleton-shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function ProductPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-4 bg-slate-300 rounded w-12 skeleton-shimmer"></div>
          <div className="text-slate-400">/</div>
          <div className="h-4 bg-slate-300 rounded w-20 skeleton-shimmer"></div>
          <div className="text-slate-400">/</div>
          <div className="h-4 bg-slate-300 rounded w-32 skeleton-shimmer"></div>
        </div>

        {/* Main product content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product images */}
          <ProductImageSkeleton />
          
          {/* Product info */}
          <ProductInfoSkeleton />
        </div>

        {/* Product description and tabs */}
        <ProductDescriptionSkeleton />

        {/* Related products */}
        <RelatedProductsSkeleton />
      </div>
    </div>
  );
}