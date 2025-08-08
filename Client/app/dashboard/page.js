import React from "react";
import SummaryCard from "./Home/SummaryCard";
import TrafficChart from "./Home/TrafficChart";
import Overview from "./Home/Overview";

const page = () => {
  return (
    <div>
      <Overview />
      {/* <SummaryCard />/ */}
      <TrafficChart />
    </div>
  );
};

export default page;
