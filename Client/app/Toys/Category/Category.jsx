"use client";

import Image from "next/image";

const categories = [
  { name: "Organic Food", items: 6, image: "/HOV_BANNER_4d86b1c0-96b4-4d5d-986c-f1acf96a92cb_1024x1024.webp" },
  { name: "Kids Toy", items: 5, image: "/Toy-Names-For-Kids-696x476.jpg" },
  { name: "Decoration", items: 6, image: "/61dd472963ee3_hariken-candel-showpiece-black-and-pink-64565.jpeg" },
  { name: "Sunglases", items: 1, image: "/download.avif" },
];

export default function Category() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-semibold">Categories You Might Like</h2>
        <a href="#" className="text-sm font-medium text-black border-b border-black hover:text-gray-600">
          View All Collection
        </a>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div key={index} className="text-center">
            <div className="w-60 h-60 mx-auto rounded-full overflow-hidden border border-gray-200">
              <Image src={cat.image} alt={cat.name} width={200} height={200} className="object-cover w-full h-full" />
            </div>
            <h3 className="mt-4 font-medium">{cat.name}</h3>
            <p className="text-gray-500 text-sm">{cat.items} Items</p>
          </div>
        ))}
      </div>
    </section>
  );
}
