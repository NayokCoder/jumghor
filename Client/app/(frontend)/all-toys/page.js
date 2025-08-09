import Image from "next/image";
import React, { Suspense } from "react";
import ClientToysList from "./ClientToysList";
import postAllproduct from "@/app/Lib/postAllproduct";
import ToyPageSkeleton from "@/app/Components/Loading/ToyPageSkeleton";

const page = async () => {
  const initialToys = await postAllproduct();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">All Toys</h1>
          <p className="text-gray-600 mb-6">Discover amazing toys for every age</p>
        </div>

        <Suspense fallback={<ToyPageSkeleton cardCount={8} />}>
          <ClientToysList initialToys={initialToys} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
