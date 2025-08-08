"use client";
import React from "react";

export default function SummaryCard({ 
  icon, 
  title, 
  value, 
  color = "text-blue-500",
  bgColor = "bg-blue-50",
  trend = null,
  trendValue = null,
  isLoading = false
}) {
  const getTrendIcon = () => {
    if (trend === "up") return "↗";
    if (trend === "down") return "↘";
    return null;
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-green-500";
    if (trend === "down") return "text-red-500";
    return "text-gray-500";
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-6 hover:shadow-md hover:border-gray-200 transition-all duration-200 cursor-pointer group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`${bgColor} ${color} p-3 rounded-lg text-2xl group-hover:scale-105 transition-transform duration-200`}>
            {icon}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-600 mb-1">{title}</div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
            {(trend || trendValue) && (
              <div className={`flex items-center space-x-1 text-xs mt-1 ${getTrendColor()}`}>
                {getTrendIcon() && <span className="text-sm">{getTrendIcon()}</span>}
                {trendValue && <span className="font-medium">{trendValue}</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
