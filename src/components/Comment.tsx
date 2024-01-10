import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import axios from "axios";

const Comment = ({
  user_id,
  username,
  comment_id,
  c_query,
  c_time_posted,
  c_upvotes,
}) => {
  const [isCommentUpvote, setIsCommentUpvote] = useState(false);
  const [commentUpvotes, setCommentUpvotes] = useState(0);

  const handleCommentUpvote = () => {
    setIsCommentUpvote(!isCommentUpvote);
    const getUpvote = async () => {
      const response = await axios.put(
        `http://localhost:3000/api/upvoteComment/${comment_id}/${
          isCommentUpvote ? "downvote" : "upvote"
        }`,
        { user_id: user_id }
      );
      setCommentUpvotes(response.data[0].c_upvotes);
    };
    getUpvote();
  };

  const checkCommentUpvote = async () => {
    const response = await axios.put(
      "http://localhost:3000/api/isCommentUpvote",
      { user_id: user_id, comment_id: comment_id }
    );
    if (response.data[0]) {
      setIsCommentUpvote(true);
    }
  };

  useEffect(() => {
    checkCommentUpvote();
    setCommentUpvotes(c_upvotes);
  }, []);

  return (
    <>
      {" "}
      <div key={comment_id}>
        <hr className="border-t-2 border-gray-200 my-4" />
        <div className="flex flex-row">
          <div className="flex flex-col items-center pt-1">
            <div className="w-8 h-8">
              <ArrowUpIcon
                className={`${
                  isCommentUpvote
                    ? "text-blue-500 bg-blue-200"
                    : "text-black bg-gray-200"
                } flex-1 p-1 transition transition-duration-150 hover:text-blue-900 hover:bg-blue-200 hover:cursor-pointer rounded-lg`}
                id={comment_id}
                onClick={handleCommentUpvote}
              />
            </div>
            <span className="mt-1 select-none">{commentUpvotes}</span>
          </div>
          <div className="ml-4">
            <div className="text-sm text-gray-500">
              Reply by{" "}
              <span className="font-semibold text-gray-600">{username}</span>
            </div>
            <div className="pt-1 pb-1">{c_query}</div>
            <div className="text-sm text-gray-400">
              {new Date(c_time_posted).toUTCString()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
