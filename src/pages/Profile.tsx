import React from "react";
import Navbar from "../components/Navbar";
import UserForm from "../components/UserForm";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const username = localStorage.getItem("username");
  const user_id = localStorage.getItem("user_id");

  const getMyPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/myPosts/${user_id}`
      );
      setMyPosts(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  const handleClick = () => {
    setIsEdit(true);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center text-gray-600 hover:text-gray-900 text-left select-none max-h-1/2">
        <div className="flex flex-col w-2/5 bg-gray-50 p-5 m-3 rounded-lg border border-2 hover:border-gray-300 transition transition-duration-150">
          <div className="flex flex-row">
            <div className="flex-1">
              <h1 className="font-semibold text-4xl">
                {username?.replaceAll('"', "")}
              </h1>
              <h2 className="text-sm text-gray-500">User #{user_id}</h2>
            </div>
            <div className="flex items-center">
              {!isEdit && (
                <button
                  className="border-1 rounded-md border-gray-200 bg-white"
                  onClick={handleClick}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          {isEdit && <UserForm />}
        </div>
        <div className="w-2/5 bg-gray-50 p-5 m-3 rounded-lg border border-2 hover:border-gray-300 transition transition-duration-150">
          <h1 className="font-semibold text-2xl">My Posts</h1>
          {myPosts.map((post, i) => {
            return (
              <Card
                key={post.post_id}
                username={post.username}
                post_id={post.post_id}
                p_title={post.p_title}
                p_query={post.p_query}
                p_time_posted={post.p_time_posted}
                p_upvotes={post.p_upvotes}
                category_name={post.category_name}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
