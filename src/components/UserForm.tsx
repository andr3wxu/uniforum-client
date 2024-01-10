import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./button";

const UserForm = () => {
  const [formData, setFormData] = useState({ username: "" });
  const [error, setError] = useState("");

  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/userInfo/${user_id}`
      );
      setFormData({
        username: response.data.username,
      });
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();
    try {
      const updateUser = async () => {
        await axios.post(`http://localhost:3000/api/edit/${user_id}`, {
          username: formData.username,
        });
      };
      await updateUser();
      localStorage.setItem("username", formData.username);
      navigate("/forum");
    } catch (error) {
      setError(error.response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-full mt-3">
          <label className="ml-1">Username</label>
          <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500 mb-2"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          ></input>
          {error && <div className="text-red-500 text-sm ml-1">{error}</div>}
          <div className="w-full flex justify-end pr-1 text-sm">
            <Button text="Apply Changes" type="submit" />
          </div>
        </div>
      </form>
    </>
  );
};

export default UserForm;
