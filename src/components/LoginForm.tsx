import React from "react";
import Button from "./button";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  localStorage.clear();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    return;
  };

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault(); // prevents default form behaviour
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email: formData.email,
        password: formData.password,
      });
      console.log("Login successful");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.user.user_id);
      localStorage.setItem(
        "username",
        JSON.stringify(response.data.user.username)
      );
      navigate("/forum");
    } catch (error) {
      setError(error.response.data);
    }
    return;
  };
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <form onSubmit={handleSubmit}>
        <div className="max-w-lg w-screen">
          <div className="flex flex-col rounded-lg max-w-md w-3/5 bg-gray-50 mx-auto px-4 pb-3 pt-3 border-2">
            <h1 className="text-2xl mx-auto pb-4 pt-2 font-semibold text-gray-600">
              Login
            </h1>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500 mb-2"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            ></input>
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            ></input>
            {error && <p className="text-red-500 text-sm pt-2">{error}</p>}
            <Button text="Login" type="submit" />
            {/* <Link
              key="forgot-password"
              href="../marketplace"
              className="text-sm text-blue-500 hover:text-blue-700 transition duration-150 mx-auto mt-3"
            >
              <p>Forgot your password?</p>
            </Link>
            <Link
              key="sign-up"
              href="../marketplace"
              className="text-sm text-blue-500 hover:text-blue-700 transition duration-150 mx-auto mt-1"
            >
              <p>Sign Up</p>
            </Link> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
