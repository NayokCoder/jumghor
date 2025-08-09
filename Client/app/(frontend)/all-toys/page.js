import React, { Suspense } from "react";
import ClientToysList from "./ClientToysList";
import postAllproduct from "@/app/Lib/postAllproduct";
import ToyPageSkeleton from "@/app/Components/Loading/ToyPageSkeleton";

const page = async () => {
  const initialToys = await postAllproduct();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className=" mb-12">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">All Toys</h1>
          <p className="text-gray-600 font-semibold  mb-6">Discover amazing toys for every age</p>
        </div>

        <Suspense fallback={<ToyPageSkeleton cardCount={8} />}>
          <ClientToysList initialToys={initialToys} />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
