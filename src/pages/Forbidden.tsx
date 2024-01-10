import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <>
      <div className="pt-10">Forbidden</div>
      <Link to="/forum">Back to Forum</Link>
    </>
  );
};

export default Forbidden;
