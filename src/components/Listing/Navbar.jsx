import React from "react";

const Navbar = ({ title, count }) => {
  return (
    <div className="px-4 py-6 bg-white shadow-md sticky top-0 z-10">
      <div className="w-[80%] mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
          {`Best Maternity Photoshoot Services ${title}`}
        </h1>
        <p className="text-gray-600 mt-1">{count} photographers available</p>
      </div>
    </div>
  );
};

export default Navbar;
