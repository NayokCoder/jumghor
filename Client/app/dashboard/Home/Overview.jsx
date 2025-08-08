"use client";
import { FaBox, FaDollarSign, FaShoppingCart, FaUsers } from "react-icons/fa";
import SummaryCard from "./SummaryCard";

const Overview = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={<FaShoppingCart />} title="Orders" value="1,024" />
        <SummaryCard icon={<FaDollarSign />} title="Revenue" value="$12,430" />
        <SummaryCard icon={<FaBox />} title="Products" value="128" />
        <SummaryCard icon={<FaUsers />} title="Visitors" value="4,582" />
      </div>
    </div>
  );
};

export default Overview;
