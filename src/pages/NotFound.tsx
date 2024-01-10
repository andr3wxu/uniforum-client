import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center">
      <h1 className="text-gray-500 font-semibold text-3xl">
        404: Page not found
      </h1>
      <Link className="text-blue-500 hover:text-blue-600 mt-2" to="/forum">
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
