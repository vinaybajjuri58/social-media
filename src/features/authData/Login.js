import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAPICall } from "./authSlice";
import { toast } from "react-toastify";
const initialLoginData = {
  email: "",
  password: "",
};
export const Login = () => {
  const [userData, setUserData] = useState(initialLoginData);
  const authData = useSelector((store) => store.authData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUserData((loginData) => ({
      ...loginData,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (authData.isLoggedIn) {
      navigate("/posts");
    }
    if (authData.status === "error") {
      toast.error("Login Failed ");
    }
  }, [authData.isLoggedIn, authData.status, authData.errorMessage, navigate]);
  return (
    <div className="w-full min-h-screen  text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl mx-auto text-center">
        <span className="text-2xl font-light">Login to your account</span>
        <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
          <div className="h-2 bg-indigo-400 rounded-t-md"></div>
          <div className="py-6 px-8">
            <label className="block font-semibold">Email</label>
            <input
              className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              type="text"
              value={userData.email}
              onChange={handleChange}
              name="email"
            />
            <label className="block mt-3 font-semibold">Password </label>
            <input
              type="password"
              className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              value={userData.password}
              onChange={handleChange}
              name="password"
            />
            <button
              className="mt-4 mr-5 bg-indigo-500  text-white py-2 px-6 rounded-lg"
              onClick={() => {
                toast.info("LogginIn !!");
                dispatch(
                  loginAPICall({
                    email: userData.email,
                    password: userData.password,
                  })
                );
              }}
            >
              Login
            </button>
            <Link className="text-sm ml-5  hover:underline" to="/signup">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
