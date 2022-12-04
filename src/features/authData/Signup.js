import { Link, useNavigate } from "react-router-dom";
import { signUp } from "./apiCalls";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required().min(5),
  userName: yup.string().required().min(4),
  email: yup.string().email().required(),
  password: yup.string().required().min(7),
});

export const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const signUpHandler = async (data) => {
    toast.info("SigningUp !!");
    const response = await signUp({
      name: data.name,
      userName: data.userName,
      email: data.email,
      password: data.password,
    });
    if (response.success === true) {
      toast.success("SignedUp successfully");
      navigate("/login");
    } else {
      toast.error("Signup failed");
    }
  };
  return (
    <div className="w-full min-h-screen  text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:w-full sm:m-0">
      <div className="relative py-3 md:w-5/6 sm:max-w-xl mx-auto text-center sm:w-full">
        <span className="text-2xl font-light">SignUp </span>
        <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left sm:w-full">
          <div className="h-2 bg-indigo-400 rounded-t-md"></div>
          <div className="py-6 px-8 sm:w-full">
            <form onSubmit={handleSubmit(signUpHandler)}>
              <label className="block mt-3 font-semibold">Name </label>
              <input
                type="text"
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                name="name"
                {...register("name")}
              />
              <span className="text-red-700">{errors.name?.message}</span>
              <label className="block mt-3 font-semibold">UserName </label>
              <input
                type="text"
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                name="userName"
                {...register("userName")}
              />
              <span className="text-red-700">{errors.userName?.message}</span>
              <label className="block mt-3 font-semibold">Email </label>
              <input
                type="text"
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                name="email"
                {...register("email")}
              />
              <span className="text-red-700">{errors.email?.message}</span>
              <label className="block mt-3 font-semibold">Password </label>
              <input
                type="password"
                className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                name="password"
                {...register("password")}
              />
              <span className="text-red-700">{errors.password?.message}</span>
              <div>
                <button
                  className="mt-4 bg-indigo-500  text-white py-2 px-6 rounded-lg"
                  type="submit"
                >
                  SignUp
                </button>
                <Link className="text-sm ml-5  hover:underline" to="/login">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
