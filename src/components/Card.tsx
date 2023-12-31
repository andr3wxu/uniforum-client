import React from "react";
import { Link } from "react-router-dom";
import { posts } from "../definitions";

const Card = ({ post_id, p_query, p_upvotes, category }: posts) => {
  return (
    <>
      <Link
        className="text-gray-600 hover:text-gray-900 text-left"
        to={post_id.toString()}
      >
        <div className="bg-gray-50 p-5 m-3 rounded-md border border-2 hover:border-gray-300 transition transition-duration-150">
          <div className="font-bold text-xl">{p_query}</div>
          <div>UPVOTES: {p_upvotes}</div>
          <div>CATEGORY: {category == undefined ? "NONE" : category}</div>
        </div>
      </Link>
    </>
  );
};

export default Card;
