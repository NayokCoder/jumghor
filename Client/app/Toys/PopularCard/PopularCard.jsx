"use client";

import Image from "next/image";

export default function PopularCard() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* View All Products Link */}
      <div className="text-center mb-8">
        <a href="#" className="text-lg font-medium underline hover:text-gray-700">
          View All Products
        </a>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Item */}
        <div className="relative">
          <Image
            src="/images/crossbody-bag.jpg" // replace with actual image path
            alt="Crossbody Bag"
            width={600}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="mt-4">
            <h2 className="text-2xl font-bold">Crossbody Bag</h2>
            <p className="text-gray-600 mt-2">From beach to party: Perfect styles for every occasion.</p>
            <a href="#" className="mt-3 inline-block text-black font-semibold underline hover:text-gray-800">
              Shop Now
            </a>
          </div>
        </div>

        {/* Right Item */}
        <div className="relative">
          <Image
            src="/images/capsule-collection.jpg" // replace with actual image path
            alt="Capsule Collection"
            width={600}
            height={600}
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/30 text-white text-center">
            <h2 className="text-3xl font-bold">Capsule Collection</h2>
            <p className="mt-2 text-lg">Reserved for special occasions</p>
            <a href="#" className="mt-4 inline-block text-white font-semibold underline">
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
