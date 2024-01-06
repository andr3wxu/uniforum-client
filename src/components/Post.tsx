import React from "react";
import Navbar from "./Navbar";
import CommentForm from "./CommentForm";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export const UpdatePost = createContext(null);

const Post = () => {
  const postId = useParams();
  const [post, setPost] = useState(null);
  const [postDataFetched, setPostDataFetched] = useState(false);
  const [commentDataFetched, setCommentDataFetched] = useState(false);
  const [isPostUpvote, setIsPostUpvote] = useState(false);
  const [postUpvote, setPostUpvote] = useState(0);
  const [commentData, setCommentData] = useState([]);
  const [postUpdate, setPostUpdate] = useState(0);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    const getPostData = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/${postId.postId}`
      );
      setPost(response.data);
      setPostUpvote(response.data.p_upvotes);
    };
    getPostData();
    setPostDataFetched(true);
  }, [postId]);

  useEffect(() => {
    const getCommentData = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/getCommentDataByNew/${postId.postId}`
      );
      setCommentData(response.data);
      setCommentDataFetched(true);
    };
    getCommentData();
  }, [postId, postUpdate]);

  const handleUpvote = () => {
    setIsPostUpvote(!isPostUpvote);
    const getUpvote = async () => {
      const response = await axios.put(
        `http://localhost:3000/api/${post.post_id}/${
          isPostUpvote ? "downvote" : "upvote"
        }`
      );
      setPostUpvote(response.data[0].p_upvotes);
    };
    getUpvote();
  };

  const handleUpdate = () => {
    setPostUpdate((postUpdate) => postUpdate + 1);
  };

  return postDataFetched && commentDataFetched && post ? (
    <>
      <UpdatePost.Provider value={handleUpdate}>
        <div className="w-full flex flex-col justify-center items-center">
          <Navbar />
          <Link
            to="/forum"
            className="right-0 text-blue-500 active:text-blue-300 hover:text-blue-500"
          >
            Back
          </Link>
          <div id="postbox" className="flex flex-row w-1/2">
            <div className="flex flex-col items-center w-8 pt-5">
              <ArrowUpIcon
                className={`${
                  isPostUpvote
                    ? "bg-blue-200 text-blue-500"
                    : "text-black bg-gray-200"
                } w-full p-1 transition transition-duration-150 hover:text-blue-900 hover:bg-blue-200 hover:cursor-pointer rounded-lg`}
                onClick={handleUpvote}
              />
              <span className="mt-1 select-none">{postUpvote}</span>
            </div>
            <div className="w-full text-gray-600 hover:text-gray-900 text-left select-none max-h-1/2">
              <div className="bg-gray-50 p-5 m-3 rounded-lg border border-2 hover:border-gray-300 transition transition-duration-150">
                <div className="text-sm text-gray-500">
                  Posted by{" "}
                  <span className="font-semibold text-gray-600">
                    {post.username}
                  </span>
                  {post.category_name == undefined
                    ? ""
                    : ` in ${post.category_name}`}
                </div>
                <div className="font-bold text-xl">{post.p_title}</div>
                <div className="mb-1">{post.p_query}</div>
                <div className="text-sm text-gray-400">
                  {new Date(post.p_time_posted).toUTCString()}
                </div>
                <hr className="border-t-2 border-gray-200 my-4" />
                <CommentForm />
                <div>
                  {commentData.map((comment) => {
                    return (
                      <div key={comment.comment_id}>
                        <hr className="border-t-2 border-gray-200 my-4" />
                        <div className="flex flex-row">
                          <div className="flex flex-col items-center pt-1">
                            <div className="w-8 h-8">
                              <ArrowUpIcon
                                className={`${
                                  isPostUpvote
                                    ? "text-blue-500 bg-blue-200"
                                    : "text-black bg-gray-200"
                                } flex-1 p-1 transition transition-duration-150 hover:text-blue-900 hover:bg-blue-200 hover:cursor-pointer rounded-lg`}
                                onClick={handleUpvote}
                              />
                            </div>
                            <span className="mt-1 select-none">
                              {postUpvote}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm text-gray-500">
                              Reply by{" "}
                              <span className="font-semibold text-gray-600">
                                {comment.username}
                              </span>
                            </div>
                            <div className="pt-1 pb-1">{comment.c_query}</div>
                            <div className="text-sm text-gray-400">
                              {new Date(comment.c_time_posted).toUTCString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </UpdatePost.Provider>
    </>
  ) : (
    <>
      <Link to="/forum">Post not found. Back to forum</Link>
    </>
  );
};

export default Post;
