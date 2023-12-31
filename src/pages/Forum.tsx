import React from "react";
import Card from "../components/Card";
import { posts } from "../definitions";
import { useState, useEffect } from "react";
import axios from "axios";

const Marketplace = () => {
  const [postData, setPostData] = useState<posts[]>([]);
  const getPostData = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/getPostDataByNew/20`
    );
    setPostData(response.data);
  };
  useEffect(() => {
    getPostData();
  }, []);
  return (
    <>
      <div className="flex items-start justify-center">
        <div className="w-1/2 grid grid-cols-1">
          {postData.map((post, i) => {
            return (
              <Card
                key={post.post_id}
                user_id={post.user_id}
                post_id={post.post_id}
                p_title={post.p_title}
                p_query={post.p_query}
                p_time_posted={post.p_time_posted}
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
