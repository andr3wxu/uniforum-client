import React, { ReactNode } from "react";
import { MouseEventHandler } from "react";

interface Props {
  text: string;
  type: "submit" | "button" | "reset";
}

const Button = ({ text, type }: Props) => {
  return (
    <>
      <button
        type={type}
        className="m-auto p-0 mt-3 w-16 h-8 rounded-md bg-blue-500 text-white"
      >
        {text}
      </button>
    </>
  );
};

export default Button;
