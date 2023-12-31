import React from "react";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  price: number | string;
  // image: string;
}

const Card = ({ name, price }: Props) => {
  return (
    <>
      <Link
        className="text-gray-600 hover:text-gray-800"
        to={name.replace(" ", "-").toLowerCase()}
      >
        <div className="bg-gray-50 p-5 m-3 rounded-md border border-2 hover:border-gray-300 transition transition-duration-150">
          <div className="font-bold">{name}</div>
          <div>${price}</div>
        </div>
      </Link>
    </>
  );
};

export default Card;
