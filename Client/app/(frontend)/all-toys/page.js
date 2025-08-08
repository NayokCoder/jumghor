import postAllproduct from "@/app/lib/postAllproduct";
import Image from "next/image";
import React from "react";

const page = async () => {
  const toys = await postAllproduct();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🧸 All Toys Collection</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our amazing collection of toys that bring joy and wonder to children of all ages</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {toys.map((toy) => {
            const images = typeof toy.images === "string" ? JSON.parse(toy.images) : toy.images;

            return (
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group border border-gray-100" key={toy.id}>
                <div className="relative overflow-hidden">
                  {images && images.length > 0 ? (
                    <div className="carousel w-full h-56 rounded-t-2xl">
                      {images.map((image, index) => (
                        <div key={index} className={`carousel-item w-full ${index === 0 ? "block" : "hidden"}`}>
                          <Image src={image} alt={`${toy.title} - Image ${index + 1}`} width={400} height={300} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                      ))}
                      {images.length > 1 && (
                        <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
                          <span className="text-white text-sm font-medium">1/{images.length}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center rounded-t-2xl">
                      <span className="text-gray-400 text-4xl">🧸</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-200 line-clamp-2">{toy.title}</h2>
                    <div className="flex items-center gap-1 text-yellow-400 ml-2">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                      <span className="text-sm text-gray-600">4.5</span>
                    </div>
                  </div>

                  <div className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3" dangerouslySetInnerHTML={{ __html: toy.description }} />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">In Stock</span>
                    </div>

                    <div className="flex gap-2">
                      <button className="btn btn-circle btn-sm btn-outline hover:btn-primary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button className="btn btn-sm btn-primary">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {toys.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎪</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Toys Found</h3>
            <p className="text-gray-500">Check back later for new arrivals!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
