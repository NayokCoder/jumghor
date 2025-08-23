import React from "react";
import Banner from "../Toys/Banner/Banner";
import Items from "../Toys/Items/Item";
import Category from "../Toys/Category/Category";
import Card from "../Toys/Crad/Card";
import PopularCard from "../Toys/PopularCard/PopularCard";

const page = () => {
  return (
    <div>
      <Banner />
      <Category />
      <Card />
      <PopularCard />
      {/* <Items /> */}
    </div>
  );
};

export default page;
