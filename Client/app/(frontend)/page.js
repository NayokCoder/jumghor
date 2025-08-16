import React from "react";
import Banner from "../Toys/Banner/Banner";
import Items from "../Toys/Items/Item";
import Category from "../Toys/Category/Category";
import Card from "../Toys/Crad/Card";

const page = () => {
  return (
    <div>
      <Banner />
      <Category />
      <Card />
      <Items />
    </div>
  );
};

export default page;
