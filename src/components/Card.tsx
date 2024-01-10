import React from "react";
import { Link } from "react-router-dom";
import { postData } from "../definitions";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useState, useEffect } from "react";

const Card = ({
  username,
  post_id,
  p_title,
  p_query,
  p_time_posted,
  p_upvotes,
  category_name,
}: postData) => {
  const [isUpvote, setIsUpvote] = useState(false);
  const [upvote, setUpvote] = useState(p_upvotes);

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    const isUpvote = async () => {
      const response = await axios.put("http://localhost:3000/api/isUpvote", {
        user_id: user_id,
        post_id: post_id,
      });
      const user = response.data;
      if (user[0]) {
        setIsUpvote(true);
      }
    };
    isUpvote();
  }, []);

  const handleUpvote = () => {
    setIsUpvote(!isUpvote);
    const getUpvote = async () => {
      const response = await axios.put(
        `http://localhost:3000/api/${post_id}/${
          isUpvote ? "downvote" : "upvote"
        }`,
        { user_id: user_id }
      );
      setUpvote(response.data[0].p_upvotes);
    };
    getUpvote();
  };
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col items-center w-8 pt-5">
          <ArrowUpIcon
            className={`${
              isUpvote ? "text-blue-500 bg-blue-200" : "text-black bg-gray-200"
            } w-full p-1 transition transition-duration-150 hover:text-blue-500 hover:cursor-pointer rounded-lg`}
            onClick={handleUpvote}
          />
          <span className="mt-1 select-none">{upvote}</span>
        </div>
        <Link
          className="w-full text-gray-600 hover:text-gray-900 text-left select-none max-h-1/2"
          to={post_id.toString()}
        >
          <div className="bg-gray-50 p-5 m-3 rounded-lg border border-2 hover:border-gray-300 transition transition-duration-150">
            <div className="text-sm text-gray-500">
              Posted by{" "}
              <span className="font-semibold text-gray-600">{username}</span>
              {category_name == undefined ? "" : ` in ${category_name}`}
            </div>
            <div className="font-bold text-xl">{p_title}</div>
            <div className="mb-1">
              {p_query
                ? `${
                    p_query.length > 200
                      ? `${p_query.substring(0, 200)}...`
                      : p_query
                  }`
                : p_query}
            </div>
            <div className="text-sm text-gray-400">
              {new Date(p_time_posted).toUTCString()}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Card;
