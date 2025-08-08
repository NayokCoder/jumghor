"use client";
import React from "react";
import Link from "next/link";
import { FilePlus2, icons, Inbox, LayoutDashboard, Store, User, UserPlus } from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },
  {
    name: "E-commerce",
    children: [
      { name: "Products", path: "/dashboard/products" },
      { name: "Add Product", path: "/dashboard/product-add", icons: <FilePlus2 /> },
      { name: "Billing", path: "/dashboard/billing" },
      { name: "Invoice", path: "/dashboard/invoice" },
    ],
  },
  { name: "Inbox", path: "/dashboard/inbox", icon: <Inbox />, badge: 3 },
  { name: "Users", path: "/dashboard/users", icon: <User /> },
  { name: "Sign In", path: "/signin", icon: <UserPlus /> },
  { name: "Sign Up", path: "/signup", icon: <Store /> },
];

const Sidebar = () => {
  return (
    <aside className=" z-40 w-64 h-screen bg-gray-100 text-neutral  p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <ul className="space-y-2">
        {menuItems.map((item, idx) => {
          if (item.children) {
            return (
              <li key={idx}>
                <details className="group">
                  <summary className="custom-sidebar-item">
                    <span>{item.name}</span>
                    <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <ul className="pl-4 mt-2 space-y-1 text-sm">
                    {item.children.map((child, cidx) => (
                      <li key={cidx}>
                        <Link href={child.path} className="custom-sidebar-item ">
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            );
          }

          return (
            <li key={idx}>
              <Link href={item.path} className="custom-sidebar-item ">
                <span className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  {item.name}
                </span>
                {item.badge && <span className="text-xs bg-blue-600 px-2 py-0.5 rounded-full">{item.badge}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
