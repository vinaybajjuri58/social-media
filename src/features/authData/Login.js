import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAPICall } from "./authSlice";
import { toast } from "react-toastify";
import { CircleLoading } from "../../Components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(7),
});

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "123456789",
    },
  });
  const authData = useSelector((store) => store.authData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (authData.isLoggedIn) {
      navigate("/posts");
    }
    if (authData.status === "error") {
      toast.error("Login Failed ");
    }
  }, [authData.isLoggedIn, authData.status, authData.errorMessage, navigate]);
  const onSubmit = (data) => {
    dispatch(
      loginAPICall({
        email: data.email,
        password: data.password,
      })
    );
  };
  return (
    <div className="w-full min-h-screen  text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:m-0">
      <div className="relative py-3 md:w-5/6 sm:max-w-xl mx-auto text-center">
        <span className="text-2xl font-light">Login to your account</span>
        <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
          <div className="h-2 bg-indigo-400 rounded-t-md"></div>
          <div className="py-6 px-8">
            <form onSubmit={handleSubmit(onSubmit)} className="md:w-full">
              <label className="block font-semibold">Email</label>
              <input
                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                type="text"
                name="email"
                {...register("email")}
              />
              <span className="text-red-700">{errors.email?.message}</span>
              <label className="block mt-3 font-semibold">Password </label>
              <input
                type="password"
                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                name="password"
                {...register("password")}
              />
              <span className="text-red-700">{errors.password?.message}</span>
              <div>
                <button
                  className="mt-4 mr-5 bg-indigo-500 w-36 text-white py-2 px-6 rounded-lg"
                  type="submit"
                >
                  {authData.loginAPICall ? <CircleLoading /> : "Login"}
                </button>
                <Link className="text-sm ml-5  hover:underline" to="/signup">
                  Signup
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
