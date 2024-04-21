import React from "react";
import DropdownMenu from "./Dropdown.js";

const Navbar = () => {
  const navItems = [
    {
      name: "Dashboard",
      route: "/",
    },
    {
      name: "Booking",
      route: "/seat-booking",
    },
  ];

  return (
    <div className="bg-primary flex justify-between items-center h-24 mx-auto px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-white" data-testid={"Bus"}>
        BUS.
      </h1>
      <ul className="hidden md:flex">
        <li className="py-4 px-4">
          <DropdownMenu navItems={navItems} />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
