export default async function postAllproduct() {
  const res = await fetch("http://localhost:5000/api/get-786-products");
  const data = await res.json();
  if (!data.success) {
    throw new Error("Failed to fetch data");
  }
  return data.data[0] || [];
}
