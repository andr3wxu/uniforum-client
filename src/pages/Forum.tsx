import React from "react";
import Card from "../components/Card";
import { posts } from "../definitions";

const productArray: posts[] = [
  {
    user_id: 1,
    post_id: 1,
    p_query: "What is the radius of the Earth?",
    p_upvotes: 2,
    category: "physics",
  },
  {
    user_id: 1,
    post_id: 2,
    p_query: "How much does the sun weigh?",
    p_upvotes: 0,
    category: "physics",
  },
  {
    user_id: 2,
    post_id: 3,
    p_query: "What is 1+1?",
    p_upvotes: 0,
    category: undefined,
  },
];

const Marketplace = () => {
  return (
    <>
      <div className="flex items-start justify-center">
        <div className="w-1/2 grid grid-cols-1">
          {productArray.map((post, i) => {
            return (
              <Card
                user_id={post.user_id}
                post_id={post.post_id}
                p_query={post.p_query}
                p_upvotes={post.p_upvotes}
                category={post.category}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Marketplace;
