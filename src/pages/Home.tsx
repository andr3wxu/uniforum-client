import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center">
      <h1 className="font-normal">
        Welcome to <span className="font-bold text-blue-500">Uniforum</span>!
      </h1>
      <p className="text-xl text-gray-500 mb-8 mt-1">
        Ask questions, get answers.
      </p>
      <Link
        className="text-blue-500 hover:text-blue-600 font-semibold"
        to={"/login"}
      >
        Login or sign up to get started!
      </Link>
    </div>
  );
};

export default Home;
