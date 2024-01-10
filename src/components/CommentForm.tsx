import React from "react";
import Button from "./button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UpdatePost } from "./Post";

const CommentForm = () => {
  const [formData, setFormData] = useState({
    comment: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user_id");
  const username = localStorage.getItem("username");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const { postId } = useParams();

  const handleUpdate = useContext(UpdatePost);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/comment", {
        user_id: user,
        post_id: postId,
        c_query: formData.comment,
      });
      setFormData({ comment: "" });
      handleUpdate();
    } catch (error) {
      navigate("/forbidden");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-sm mx-auto pb-1 pl-1 text-gray-600 w-full text-left">
          Leave a comment as{" "}
          <span className="font-semibold">{username?.replace(/"/g, "")}</span>
        </h1>
        <textarea
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500 mb-2 pb-2"
          name="comment"
          placeholder="Comment here"
          value={formData.comment}
          onChange={handleChange}
        ></textarea>
        <div className="w-full flex justify-end pr-1 text-sm">
          <Button text="Comment" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
