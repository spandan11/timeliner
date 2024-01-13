import React from "react";

const NavItems = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      <ul className="block sm:flex items-center justify-center gap-4">
        <li>Add new</li>
        <li>Browse all</li>
      </ul>
    </div>
  );
};

export default NavItems;
