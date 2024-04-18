import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

function DropdownMenu({ navItems = [] }) {
  const [isDropDown, setDropDown] = useState(false);
  const location = useLocation();
  const [dropDownOption, setOption] = useState(
    location.pathname === "/seat-booking" ? "Booking" : "Dashboard"
  );
  const navigate = useNavigate();
  const handleDropdownClick = (event) => {
    setDropDown(!isDropDown);
    event.stopPropagation();
  };
  const handleListClick = (item) => {
    setOption(item.name);
    setDropDown(!isDropDown);
    navigate(item.route);
  };
  useEffect(() => {
    const handleClick = () => {
      setDropDown(false);
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div className="relative inline-block text-left">
      <button
        className="inline-flex justify-center w-full rounded-lg border-none bg-white text-black px-8 py-2 focus:outline-none"
        onClick={handleDropdownClick}
      >
        <p>{dropDownOption}</p>
        <FaChevronDown className="ml-2 mt-1" />
      </button>
      <div
        className={`absolute left-0 w-44 mt-2 origin-top-right bg-white border-none rounded-lg shadow-lg z-10 transition-opacity opacity-100`}
      >
        {isDropDown && (
          <ul
            className={`transition-all duration-300 "transform translate-y-0 opacity-100"`}
          >
            {navItems.map((item, index) => (
              <li
                key={index}
                className="text-black hover:bg-primary hover:text-white px-2 py-2 cursor-pointer"
                data-testid={`list-item-${item.name}`}
                onClick={() => handleListClick(item)}
              >
                {item?.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DropdownMenu;
