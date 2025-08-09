import { useQuery } from "@tanstack/react-query";

export const fetchToys = async () => {
  const res = await fetch("http://localhost:5000/api/get-786-products");
  const data = await res.json();
  if (!data.success) {
    throw new Error("Failed to fetch toys");
  }
  return data.data[0] || [];
};

export const fetchToyById = async (id) => {
  const res = await fetch(`http://localhost:5000/api/get-product/${id}`);
  const data = await res.json();
  if (!data.success) {
    throw new Error("Failed to fetch toy");
  }
  return data.data;
};

export const useToys = () => {
  return useQuery({
    queryKey: ["toys"],
    queryFn: fetchToys,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};
