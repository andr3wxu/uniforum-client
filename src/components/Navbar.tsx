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
      <ul className="flex flex-row w-full justify-center bg-gray-50 border-b-2 p-2 mb-3">
        {links.map((link) => {
          return (
            <Link key={link.name} to={link.path}>
              <li className="px-3 py-1 text-blue-500 rounded-sm active:text-blue-300 hover:text-white hover:bg-blue-500 transition transition-duration-150">
                {link.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default Navbar;
