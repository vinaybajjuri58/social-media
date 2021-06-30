import { useState } from "react";
import { Link } from "react-router-dom";
const initialSignUpState = {
  userName: "",
  email: "",
  password: "",
};
export const SignUp = () => {
  const [signUpData, setSignUpData] = useState(initialSignUpState);
  const handleChange = (e) => {
    setSignUpData((initialData) => ({
      ...initialData,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl mx-auto text-center">
        <span className="text-2xl font-light">SignUp</span>
        <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
          <div className="h-2 bg-indigo-400 rounded-t-md"></div>
          <div className="py-6 px-8">
            <label className="block font-semibold">UserName </label>
            <input
              type="text"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              name="userName"
              value={signUpData.userName}
              onChange={handleChange}
            />
            <label className="block font-semibold">Email :</label>
            <input
              type="text"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              name="email"
              value={signUpData.email}
              onChange={handleChange}
            />
            <label className="block mt-3 font-semibold">Password :</label>
            <input
              type="password"
              className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              name="password"
              value={signUpData.password}
              onChange={handleChange}
            />
            <button class="mt-4 bg-indigo-500  text-white py-2 px-6 rounded-lg">
              SignUp
            </button>
            <Link className="text-sm ml-5  hover:underline" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
