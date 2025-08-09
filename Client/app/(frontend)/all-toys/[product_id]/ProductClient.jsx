"use client";

import { useState } from "react";
import { Star, Heart, Share2, ShoppingCart, Package, Truck, Shield, ArrowLeft, Plus, Minus, Check, Award, Clock, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ProductImage = ({ toy }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Parse images - handle both array and JSON string formats (same logic as ClientToysList)
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

  // If no images found, create empty array
  if (images.length === 0 && firstImage) {
    images = [firstImage];
  }

  return (
    <div className="space-y-6">
      {/* Main image */}
      <div className="relative group">
        <div className="aspect-square bg-gradient-to-br from-white via-slate-50 to-blue-50 rounded-2xl shadow-2xl overflow-hidden border border-slate-200/60 backdrop-blur-sm">
          {images.length > 0 && images[selectedImageIndex] ? (
            <Image
              src={images[selectedImageIndex]}
              alt={toy.title || toy.name || "Product Image"}
              width={700}
              height={700}
              className={`w-full h-full object-cover transition-all duration-500 ${isZoomed ? "scale-110" : "group-hover:scale-105"}`}
              priority
              unoptimized={process.env.NODE_ENV === "development"}
              onError={(e) => {
                console.log("Image failed to load:", images[selectedImageIndex]);
                e.target.style.display = "none";
                const placeholder = e.target.parentNode.querySelector(".image-placeholder");
                if (placeholder) {
                  placeholder.style.display = "flex";
                }
              }}
            />
          ) : null}

          {/* Fallback placeholder */}
          <div className={`image-placeholder w-full h-full bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center ${images.length > 0 && images[selectedImageIndex] ? "hidden" : "flex"}`}>
            <div className="text-center text-slate-600">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-60 text-slate-400" />
              <p className="text-lg font-medium text-slate-500">No Image Available</p>
            </div>
          </div>

          {/* Overlay with zoom button - only show if image exists */}
          {images.length > 0 && images[selectedImageIndex] && (
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
              <button onClick={() => setIsZoomed(!isZoomed)} className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-medium shadow-lg hover:bg-white hover:shadow-xl transform hover:scale-105">
                {isZoomed ? "Reset" : "Zoom"}
              </button>
            </div>
          )}

          {/* Sale badge */}
          {(toy.discount_price || (toy.original_price && toy.original_price > toy.price)) && <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">SALE</div>}

          {/* New badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">NEW</div>
        </div>
      </div>

      {/* Thumbnail images */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button key={index} onClick={() => setSelectedImageIndex(index)} className={`relative w-24 h-24 rounded-xl overflow-hidden border-3 transition-all duration-300 flex-shrink-0 ${selectedImageIndex === index ? "border-indigo-500 shadow-lg ring-2 ring-indigo-200 scale-105" : "border-slate-200 hover:border-indigo-300 hover:shadow-md"}`}>
              <Image src={image} alt={`${toy.title || toy.name} ${index + 1}`} width={96} height={96} className="w-full h-full object-cover" unoptimized={process.env.NODE_ENV === "development"} />
              {selectedImageIndex === index && <div className="absolute inset-0 bg-indigo-500/20"></div>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductInfo = ({ toy }) => {
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const rating = toy.rating || 4.5;
  const reviewCount = toy.review_count || 127;

  const handleAddToCart = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    console.log(`Added ${quantity} of`, toy, "to cart");
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log("Toggled favorite:", toy);
  };

  return (
    <div className="space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      {/* Category and rating */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-full shadow-md">{toy.category || "Toys & Games"}</span>
          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
            <Award className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-700">Bestseller</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
              ))}
            </div>
            <span className="text-lg font-medium text-gray-700">{rating}</span>
            <span className="text-gray-500">•</span>
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <Users className="w-4 h-4" />
              {reviewCount} reviews
            </span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2">{toy.title || toy.name}</h1>
        <p className="text-lg text-gray-600">Premium Quality • Safe Materials • Educational</p>
      </div>

      {/* Price */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-4xl font-bold text-emerald-600">${toy.price}</span>
          {toy.original_price && toy.original_price > toy.price && (
            <div className="flex flex-col">
              <span className="text-xl text-gray-500 line-through">${toy.original_price}</span>
              <span className="text-sm text-emerald-600 font-semibold">{Math.round(((toy.original_price - toy.price) / toy.original_price) * 100)}% OFF</span>
            </div>
          )}
        </div>
        {toy.original_price && toy.original_price > toy.price && (
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-red-600">Save ${(toy.original_price - toy.price).toFixed(2)}</span>
            <Clock className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-600">Limited time offer</span>
          </div>
        )}
      </div>

      {/* Stock status */}
      <div className={`flex items-center gap-3 p-4 rounded-xl border-2 ${toy.stock_quantity > 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
        <div className={`w-4 h-4 rounded-full ${toy.stock_quantity > 0 ? "bg-green-500" : "bg-red-500"}`}></div>
        <span className={`font-semibold ${toy.stock_quantity > 0 ? "text-green-700" : "text-red-700"}`}>
          {toy.stock_quantity > 0 ? (
            <>
              <Check className="w-4 h-4 inline mr-1" />
              In Stock ({toy.stock_quantity} available)
            </>
          ) : (
            "Out of Stock"
          )}
        </span>
      </div>

      {/* Quantity selector */}
      {toy.stock_quantity > 0 && (
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold text-gray-700">Quantity:</span>
          <div className="flex items-center bg-gray-100 rounded-xl">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-200 rounded-l-xl transition-colors">
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-6 py-3 font-semibold text-lg min-w-[60px] text-center">{quantity}</span>
            <button onClick={() => setQuantity(Math.min(toy.stock_quantity, quantity + 1))} className="p-3 hover:bg-gray-200 rounded-r-xl transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-gray-500 text-lg font-semibold">Total: ${(toy.price * quantity).toFixed(2)}</span>
        </div>
      )}

      {/* Action buttons */}
      <div className="space-y-4">
        <div className="flex gap-3">
          <button onClick={handleAddToCart} disabled={toy.stock_quantity === 0} className={`flex-1 font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${showSuccess ? "bg-green-500 text-white" : toy.stock_quantity === 0 ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:shadow-xl transform hover:scale-[1.02]"}`}>
            {showSuccess ? (
              <>
                <Check className="w-5 h-5" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </>
            )}
          </button>

          <button onClick={handleToggleFavorite} className={`p-4 rounded-xl border-2 transition-all duration-300 shadow-md hover:shadow-lg ${isFavorite ? "bg-red-50 border-red-300 text-red-600 hover:bg-red-100" : "bg-white border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-500"}`}>
            <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
          </button>

          <button className="p-4 rounded-xl border-2 border-gray-300 text-gray-600 hover:border-blue-300 hover:text-blue-500 transition-all duration-300 shadow-md hover:shadow-lg">
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">Buy Now - Express Checkout</button>
      </div>

      {/* Features */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-600" />
          Why Choose This Product?
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Truck className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold">Free Fast Shipping</div>
              <div className="text-sm text-gray-500">On orders over $50</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <div className="font-semibold">30-Day Return Policy</div>
              <div className="text-sm text-gray-500">100% satisfaction guarantee</div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Package className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="font-semibold">Secure Packaging</div>
              <div className="text-sm text-gray-500">Premium protection guaranteed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductTabs = ({ toy }) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: "Reviews" },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Tab navigation */}
      <div className="flex gap-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="py-4">
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
            <p className="text-gray-600 leading-relaxed">{toy.description || "This amazing toy provides hours of entertainment and educational value. Crafted with care and attention to detail, it's perfect for children of all ages. Made from high-quality, safe materials, this toy meets all safety standards and is built to last."}</p>

            <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Key Benefits:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Promotes creativity and imagination</li>
              <li>Enhances fine motor skills</li>
              <li>Safe and non-toxic materials</li>
              <li>Durable construction for long-lasting play</li>
              <li>Educational value for cognitive development</li>
            </ul>
          </div>
        )}

        {activeTab === "specifications" && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Product Details</h4>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Brand:</dt>
                    <dd className="font-medium">{toy.brand || "Premium Toys"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Age Range:</dt>
                    <dd className="font-medium">{toy.age_range || "3+ years"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Material:</dt>
                    <dd className="font-medium">{toy.material || "Safe Plastic"}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Weight:</dt>
                    <dd className="font-medium">{toy.weight || "0.5 lbs"}</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Safety & Care</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• CE marked for European safety standards</li>
                  <li>• CPSC compliant for US safety</li>
                  <li>• Clean with mild soap and water</li>
                  <li>• Store in dry place when not in use</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">Write a Review</button>
            </div>

            <div className="space-y-4">
              {[
                { name: "Sarah M.", rating: 5, comment: "Amazing quality! My kids love it and it's held up well over months of play.", date: "2 weeks ago" },
                { name: "Mike R.", rating: 4, comment: "Great toy, exactly as described. Fast shipping too!", date: "1 month ago" },
                { name: "Lisa K.", rating: 5, comment: "Perfect gift for my nephew. Educational and fun!", date: "2 months ago" },
              ].map((review, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{review.name}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function ProductClient({ toy }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced header with breadcrumb */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-slate-200/60">
          <div className="flex items-center justify-between">
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
                <span className="text-gray-900 font-semibold">{toy.title || toy.name}</span>
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

        {/* Main product content */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 mb-12">
          {/* Product images - takes up 3 columns */}
          <div className="xl:col-span-3">
            <ProductImage toy={toy} />
          </div>

          {/* Product info - takes up 2 columns */}
          <div className="xl:col-span-2">
            <ProductInfo toy={toy} />
          </div>
        </div>

        {/* Product tabs with enhanced styling */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
          <ProductTabs toy={toy} />
        </div>
      </div>
    </div>
  );
}
