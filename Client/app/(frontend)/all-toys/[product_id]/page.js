import { fetchToys } from "@/app/Lib/hooks/useToys";
import React, { Suspense } from "react";
import ProductClient from "./ProductClient";
import ProductPageSkeleton from "@/app/Components/Loading/ProductPageSkeleton";
import { notFound } from "next/navigation";

const page = async ({ params }) => {
  const toyId = params.product_id;
  console.log("Toy ID:", toyId);

  try {
    const getToy = await fetchToys();
    const toy = getToy.find((toy) => toy.product_id === toyId);
    
    if (!toy) {
      console.log(`Toy with ID ${toyId} not found`);
      notFound();
    }
    
    return (
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductClient toy={toy} />
      </Suspense>
    );
  } catch (error) {
    console.error('Error fetching toys:', error);
    notFound();
  }
};

export default page;
