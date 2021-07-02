import { NavLink } from "react-router-dom";
export const Navbar = () => {
  return (
    <div className="sidebar w-64 space-y-6 py-7 px-2  w-1/8">
      <div className="h-screen pr-3">
        <nav className="mt-5 px-2">
          <NavLink
            to="/"
            activeClassName="bg-blue-200 text-blue-800"
            className="  mt-1  group  flex  items-center  px-2  py-2  text-base  leading-6  font-semibold  rounded-full hover:bg-blue-200  hover:text-blue-800"
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/notifications"
            activeClassName="bg-blue-200 text-blue-800"
            className="
            mt-1  group  flex  items-center  px-2  py-2  text-base  leading-6  font-semibold  rounded-full  hover:bg-blue-200 hover:text-blue-800"
          >
            Notifications
          </NavLink>

          <NavLink
            to="/profile"
            activeClassName="bg-blue-200 text-blue-800"
            className=" mt-1 group  flex  items-center  px-2  py-2  text-base  leading-6  font-semibold rounded-full  hover:bg-blue-200  hover:text-blue-800"
            end
          >
            Profile
          </NavLink>
          <NavLink
            to="/posts"
            activeClassName="bg-blue-200 text-blue-800"
            className=" mt-1 group  flex  items-center  px-2  py-2  text-base  leading-6  font-semibold rounded-full  hover:bg-blue-200  hover:text-blue-800"
          >
            posts
          </NavLink>

          <button className="bg-blue-400 hover:bg-blue-500 w-full mt-5 text-white  font-bold  py-2  px-4 rounded-full">
            Tweet
          </button>
        </nav>
      </div>
    </div>
  );
};
