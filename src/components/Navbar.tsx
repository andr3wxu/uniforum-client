import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const links = [
    { name: "Forum", path: "/forum" },
    { name: "Create", path: "/create" },
    { name: "Profile", path: "/profile" },
  ];
  return (
    <>
      <div className="w-full flex flex-row bg-gray-50 border-b-2 p-2 mb-3">
        <Link
          className="font-bold bg-blue-500 text-xl text-white p-1 px-2 rounded-lg ml-6 hover:text-white hover:bg-blue-600 transition transition-duration-150"
          to="/forum"
        >
          UF
        </Link>
        <ul className="flex flex-row w-full justify-center">
          {links.map((link) => {
            return (
              <Link key={link.name} to={link.path}>
                <li className="select-none px-3 py-1 text-blue-500 rounded-sm active:text-blue-300 hover:text-white hover:bg-blue-500 transition transition-duration-150">
                  {link.name}
                </li>
              </Link>
            );
          })}
        </ul>
        <Link
          className="border-blue-500 border-2 text-blue-500 p-1 rounded-lg ml-6 hover:text-white hover:bg-blue-500 transition transition-duration-150 mr-2"
          to="/login"
        >
          Logout
        </Link>
      </div>
    </>
  );
};

export default Navbar;
