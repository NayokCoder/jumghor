import Link from "next/link";
import React from "react";

const Items = () => {
  const items = [
    {
      title: "See Whole Products",
      icon: "📋",
      bgColor: "bg-pink-400",
      link: "/all-toys",
    },
    {
      title: "Age  2",
      icon: "⚙️",
      bgColor: "bg-teal-400",
      link: "/all-toys",
    },
    {
      title: "Quality Toys",
      icon: "💼",
      bgColor: "bg-blue-400",
      link: "/all-toys",
    },
    {
      title: "Best Price",
      icon: "📈",
      bgColor: "bg-purple-400",
      link: "/all-toys",
    },
  ];
  return (
    <div className="max-w-5xl mx-auto py-20">
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-blue-800 mb-8">We Facilitate</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {items.map((item, index) => (
            <Link key={index} href={item.link}>
              <div className={`${item.bgColor} rounded-lg p-8 w-48 text-white shadow-md cursor-pointer hover:scale-105 transition-transform`}>
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 mx-auto">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Items;
