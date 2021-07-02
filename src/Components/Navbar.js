import { NavLink } from "react-router-dom";
export const Navbar = () => {
  return (
    <div className="sidebar w-64 space-y-6 py-2 px-2  w-1/8 bg-blue-900 block z-20 md:bg-white md:text-blue-600">
      <div className="h-screen pr-3">
        <nav className="mt-5 px-2">
          <NavLink
            to="/"
            activeClassName="bg-blue-200 text-blue-800 sm:text-blue-100 bg-grey-700"
            className="  mt-1  group  flex  items-center  px-2  py-2  text-base  leading-6  font-semibold  rounded-full text-gray-300 md:text-blue-500 hover:text-blue-200  hover:bg-blue-600"
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/notifications"
            activeClassName="bg-blue-200 text-blue-800 sm:text-blue-100 bg-grey-700"
            className="
            mt-1  group  flex  items-center  px-2  py-2  text-base  leading-6  font-semibold  rounded-full text-gray-300 md:text-blue-500 hover:text-blue-200 hover:bg-blue-600"
          >
            Notifications
          </NavLink>

          <NavLink
            to="/profile"
            activeClassName="bg-blue-200 text-blue-800 sm:text-blue-100 bg-grey-700"
            className=" mt-1 group  flex  items-center  px-2  py-2  text-base  leading-6  font-semibold rounded-full text-gray-300 md:text-blue-500 hover:text-blue-200  hover:bg-blue-600"
            end
          >
            Profile
          </NavLink>
          <NavLink
            to="/posts"
            activeClassName="bg-blue-200 text-blue-800 sm:text-blue-100 bg-grey-700"
            className=" mt-1 group  flex  items-center  px-2  py-2  text-base  leading-6  font-semibold rounded-full text-gray-300 md:text-blue-500 hover:text-blue-200  hover:bg-blue-600"
          >
            posts
          </NavLink>

          <button className="bg-grey-400 hover:bg-blue-500 hover:text-gray-100 w-full mt-5 bg-gray-300 text-blue-700  font-bold  py-2  px-4 rounded-full">
            Tweet
          </button>
        </nav>
      </div>
    </div>
  );
};

export const TopNavBar = ({ toggleDisplay }) => {
  return (
    <div className="fixed p-2 h-16 text-2xl bg-blue-600 text-gray-100 w-full z-10">
      <button
        className="sm:block md:hidden inline-block"
        onClick={toggleDisplay}
      >
        X
      </button>
      <h1 className="px-8 py-2 inline-block">Fin-Tweets</h1>
    </div>
  );
};
