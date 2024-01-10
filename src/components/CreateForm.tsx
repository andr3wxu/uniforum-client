import React, { useEffect } from "react";
import Button from "./button";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CreateForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const categories = [
    "None",
    "Physics",
    "Mathematics",
    "Biology",
    "Chemistry",
    "History",
    "Languages",
  ];

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user_id");
  const username = localStorage.getItem("username");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

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
      await axios.post("http://localhost:3000/api/create", {
        user_id: user,
        p_title: formData.title,
        p_query: formData.description,
        category_name: formData.category,
      });
      navigate("/forum");
    } catch (error) {
      navigate("/forbidden");
    }
  };

  useEffect(() => {
    const authCheck = async () => {
      try {
        await axios.get(`http://localhost:3000/api/userInfo/${user}`);
      } catch (error) {
        navigate("/login");
      }
    };
    authCheck();
  });

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full pt-3">
        <form onSubmit={handleSubmit}>
          <div className="w-screen">
            <div className="flex flex-col rounded-lg border-2 w-2/5 bg-gray-50 mx-auto px-4 pb-3 pt-3">
              <h1 className="text-2xl mx-auto pb-4 pt-2 pl-1 font-bold text-gray-600 w-full text-left">
                Create a post
              </h1>
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500 mb-2"
                type="text"
                name="title"
                placeholder="Post title"
                value={formData.title}
                onChange={handleChange}
                required
              ></input>
              <textarea
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500 mb-2 pb-20"
                name="description"
                placeholder="Give your post a description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              <hr className="border-t-2 border-gray-200 my-4" />
              <div className="flex flex-row items-center mb-2">
                <div className="text-sm mr-3">Category: </div>
                <select
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] px-3 text-sm outline-2 placeholder:text-gray-500"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map((category) => {
                    return (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="w-full flex justify-end pr-1 text-sm">
                <Button text="Create" type="submit" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
