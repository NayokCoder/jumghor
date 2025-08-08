import React from "react";
import Navbar from "../Components/Layout/Nvbar/Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
