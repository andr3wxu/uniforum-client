import React from "react";
import Navbar from "./Navbar";
import CommentForm from "./CommentForm";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";

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
  const user_id = localStorage.getItem("user_id");
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
    const isUpvote = async () => {
      const response = await axios.put("http://localhost:3000/api/isUpvote", {
        user_id: user_id,
        post_id: postId.postId,
      });
      const user = response.data;
      if (user[0]) {
        setIsPostUpvote(true);
      }
    };
    isUpvote();
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

  const handlePostUpvote = () => {
    setIsPostUpvote(!isPostUpvote);
    const getUpvote = async () => {
      const response = await axios.put(
        `http://localhost:3000/api/${post.post_id}/${
          isPostUpvote ? "downvote" : "upvote"
        }`,
        { user_id: user_id }
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
            className="select-none right-0 text-blue-500 active:text-blue-300 hover:text-blue-500"
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
                onClick={handlePostUpvote}
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
                      <Comment
                        key={comment.comment_id}
                        user_id={user_id}
                        username={comment.username}
                        comment_id={comment.comment_id}
                        c_query={comment.c_query}
                        c_time_posted={comment.c_time_posted}
                        c_upvotes={comment.c_upvotes}
                      />
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
      <div className="w-full h-full flex flex-col items-center">
        <h1 className="text-gray-500 text-xl font-semibold">
          404: Page not Found
        </h1>
        <Link
          className="font-semibold text-blue-500 hover:text-blue-600 mb-20"
          to="/forum"
        >
          Back to forum
        </Link>
      </div>
    </>
  );
};

export default Post;
