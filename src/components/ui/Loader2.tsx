import React from "react";
import { HashLoader } from "react-spinners";

const Loader2 = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center backdrop-blur-md bg-gray-800/50 z-100">
      <HashLoader color="#0080d8" size={140} />
    </div>
  );
};

export default Loader2;