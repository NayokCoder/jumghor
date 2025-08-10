import { useState } from "react";
import Image from "next/image";

const ProductImage = ({ toy }) => {
  console.log(toy);
  console.log(toy.title);
  console.log(toy.images);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!toy) {
    return (
      <div className="aspect-square bg-gray-200 rounded-2xl flex items-center justify-center">
        <span className="text-gray-500">Loading image...</span>
      </div>
    );
  }

  const images = toy.images;

  return (
    <div className="space-y-6">
      {/* Main image */}
      <div className="relative group">
        <div className="aspect-square bg-gradient-to-br from-white via-slate-50 to-blue-50 rounded-2xl shadow-2xl overflow-hidden border border-slate-200/60 backdrop-blur-sm">
          <Image src={images[selectedImageIndex]} alt={toy.name} width={700} height={700} className={`w-full h-full object-cover transition-all duration-500 ${isZoomed ? "scale-110" : "group-hover:scale-105"}`} priority />

          {/* Overlay with zoom button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
            <button onClick={() => setIsZoomed(!isZoomed)} className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full font-medium shadow-lg hover:bg-white hover:shadow-xl transform hover:scale-105">
              {isZoomed ? "Reset" : "Zoom"}
            </button>
          </div>

          {/* Sale badge */}
          {toy.original_price && toy.original_price > toy.price && <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">SALE</div>}

          {/* New badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">NEW</div>
        </div>
      </div>

      {/* Thumbnail images */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button key={index} onClick={() => setSelectedImageIndex(index)} className={`relative w-24 h-24 rounded-xl overflow-hidden border-3 transition-all duration-300 flex-shrink-0 ${selectedImageIndex === index ? "border-indigo-500 shadow-lg ring-2 ring-indigo-200 scale-105" : "border-slate-200 hover:border-indigo-300 hover:shadow-md"}`}>
              <Image src={image || "/openart-image_vTZ2hT9K_1754240669629_raw.jpg"} alt={`${toy.name} ${index + 1}`} width={96} height={96} className="w-full h-full object-cover" />
              {selectedImageIndex === index && <div className="absolute inset-0 bg-indigo-500/20"></div>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductImage;
