import "@/app/globals.css";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "./Component/Sideber/Sidebar";
import Navber from "./Component/Navber";

export default function DashboardLayout({ children }) {
  const token = cookies().get("token");
  if (!token) redirect("/api/signin");

  return (
    <div className="flex">
      <Sidebar />

      <main className="p-4  w-full space-y-10">
        <Navber />
        {children}
      </main>
    </div>
  );
}
