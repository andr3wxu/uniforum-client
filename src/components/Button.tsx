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
        className="mt-1 p-1 rounded-md bg-blue-500 text-white"
      >
        {text}
      </button>
    </>
  );
};

export default Button;
