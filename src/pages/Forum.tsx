import React from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { postData } from "../definitions";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Forum = () => {
  const [postData, setPostData] = useState<postData[]>([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const getPostData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/getPostDataByNew`
      );
      setPostData(response.data);
    } catch (error) {
      navigate("/login");
    }
  };
  useEffect(() => {
    getPostData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex items-start justify-center">
        <div className="w-1/2 grid grid-cols-1">
          {postData.map((post, i) => {
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
    </>
  );
};

export default Forum;
