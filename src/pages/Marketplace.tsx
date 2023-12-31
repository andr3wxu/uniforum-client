import React from "react";
import Card from "../components/Card";
import { product } from "../definitions";

const productArray: product[] = [
  { product: "Product 1", price: 23.99 },
  { product: "Product 2", price: 12.2 },
];

const Marketplace = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {productArray.map((product, i) => {
          return (
            <Card name={product.product} price={product.price.toPrecision(4)} />
          );
        })}
      </div>
    </>
  );
};

export default Marketplace;
