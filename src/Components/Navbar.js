import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutButtonPressed } from "../features/authData/authSlice";
export const Navbar = ({ toggleDisplay }) => {
  const dispatch = useDispatch();
  return (
    <div className="sidebar w-64 space-y-6 py-2 px-2 fixed  bg-blue-900 block  md:bg-white md:text-blue-600">
      <div className="h-screen pr-3">
        <nav className="mt-5 px-2">
          <NavLink
            to="/"
            activeClassName="bg-blue-200 text-blue-800 sm:text-blue-100 bg-grey-700"
            onClick={toggleDisplay}
            className="  mt-1  group  flex  items-center  px-2  py-2  text-base  leading-6  font-semibold  rounded-full text-gray-300 md:text-blue-500 hover:text-blue-200  hover:bg-blue-600"
            end
          >
            Home
          </NavLink>
          {/* <NavLink
            to="/notifications"
            onClick={toggleDisplay}
            activeClassName="bg-blue-200 text-blue-800 sm:text-blue-100 bg-grey-700"
            className="
            mt-1  group  flex  items-center  px-2  py-2  text-base  leading-6  font-semibold  rounded-full text-gray-300 md:text-blue-500 hover:text-blue-200 hover:bg-blue-600"
          >
            Notifications
          </NavLink> */}

          <NavLink
            to="/profile"
            onClick={toggleDisplay}
            activeClassName="bg-blue-200 text-blue-800 sm:text-blue-100 bg-grey-700"
            className=" mt-1 group  flex  items-center  px-2  py-2  text-base  leading-6  font-semibold rounded-full text-gray-300 md:text-blue-500 hover:text-blue-200  hover:bg-blue-600"
            end
          >
            Profile
          </NavLink>
          <NavLink
            to="/posts"
            onClick={toggleDisplay}
            activeClassName="bg-blue-200 text-blue-800 sm:text-blue-100 bg-grey-700"
            className=" mt-1 group  flex  items-center  px-2  py-2  text-base  leading-6  font-semibold rounded-full text-gray-300 md:text-blue-500 hover:text-blue-200  hover:bg-blue-600"
          >
            posts
          </NavLink>
          <Link to="/">
            <button className="bg-grey-400 hover:bg-blue-500 hover:text-gray-100 w-full mt-5 bg-gray-300 text-blue-700  font-bold  py-2  px-4 rounded-full">
              Tweet
            </button>
          </Link>
          <button
            onClick={() => dispatch(logoutButtonPressed())}
            className="bg-grey-400 hover:bg-red-500 hover:text-white border-2 border-red-500  text-red-500 w-full mt-5  font-bold  py-2  px-4 rounded-full"
          >
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export const TopNavBar = ({ loggedIn, toggleDisplay }) => {
  return (
    <div className="fixed p-2 h-16 text-2xl bg-blue-900 text-gray-100 w-full z-40">
      {loggedIn && (
        <button
          className="sm:block md:hidden ml-2 inline-block"
          onClick={toggleDisplay}
        >
          <i class="fas fa-bars"></i>
        </button>
      )}
      <Link to="/">
        <h1 className="px-8 py-2 inline-block">Fin-Tweets</h1>
      </Link>
    </div>
  );
};
