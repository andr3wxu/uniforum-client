"use client";

import React from "react";
import Button from "./button";
import { useEffect, useState } from "react";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [onSubmit, setOnSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    return;
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents default form behaviour
    console.log(formData);
    return;
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="max-w-lg w-screen flex flex-col items-center justify-center">
          <div className="flex flex-col rounded-lg max-w-md w-3/5 bg-gray-50 mx-auto px-4 pb-3 pt-3">
            <h1 className="text-2xl mx-auto pb-4 pt-2">
              Login to <span className="font-bold">Carousel</span>
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
    </>
  );
};

export default LoginForm;
