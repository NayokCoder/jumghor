import { useState } from "react";
import { Award, Star, Users, Clock, Check, Minus, Plus, ShoppingCart, Heart, Share2, Shield, Truck, Package } from "lucide-react";

const ProductInfo = ({ toy, onAddToCart, onToggleFavorite, isFavorite }) => {
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const rating = toy.rating || 4.5;
  const reviewCount = toy.review_count || 127;

  const handleAddToCart = () => {
    onAddToCart(quantity);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
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
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2">{toy.name}</h1>
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

          <button onClick={onToggleFavorite} className={`p-4 rounded-xl border-2 transition-all duration-300 shadow-md hover:shadow-lg ${isFavorite ? "bg-red-50 border-red-300 text-red-600 hover:bg-red-100" : "bg-white border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-500"}`}>
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

export default ProductInfo;
