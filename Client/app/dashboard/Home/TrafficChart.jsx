"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const trafficData = [
  { day: "Mon", visits: 120 },
  { day: "Tue", visits: 200 },
  { day: "Wed", visits: 150 },
  { day: "Thu", visits: 280 },
  { day: "Fri", visits: 300 },
  { day: "Sat", visits: 200 },
  { day: "Sun", visits: 250 },
];

export default function TrafficChart() {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Weekly Traffic</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trafficData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="visits" stroke="#3b82f6" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
