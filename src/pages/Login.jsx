import React, { useState } from "react";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { getError } from "../utils/error";
import startup from "../assets/startup.png";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import Loading from "../components/Loading";
function Login() {
  const navigateTo = useNavigate();
  const provider = new GoogleAuthProvider();

  const [loading, setLoading] = useState(false);
  const handleSignInWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
    
      navigateTo("/dashboard");
      setLoading(false);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  let props = {
    navigation: [{}],
    btn: "Sign up",
    btnurl: "/signup",
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        
        navigateTo("/dashboard");
      });
      setLoading(false);
    } catch (err) {
      toast.error(getError(err));
    }
    return loading;
  };
  return (
    <div>
      <Navbar {...props} />
      <div className="flex flex-col md:flex-row">
        <div className="w-full hidden  lg:block md:w-1/2 dark:bg-white bg-gray-900 relative">
          <div className="md:5/12 dark:bg-white bg-gray-900 lg:w-5/12">
            <img
              className="absolute mt-20 ml-14"
              src={startup}
              alt="image"
              loading="lazy"
              width=""
              height=""
            />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-0 scale-25 -mr-0.5 fill-white dark:fill-gray-900"
            width="1080"
            height="920"
          >
            <rect width="100%" height="100%" fill="transparent" />
            <path d="m934.785 0-12 36c-12 36-36 108-15.975 180 19.725 72 84.225 144 103.95 216 20.025 72-3.975 144-36 216-31.725 72-72.225 144-63.975 216 8.25 72 63.75 144 92.025 180l27.975 36h48V0Z" />
          </svg>
        </div>
        <div className="w-full md:w-1/2">
          <div className=" bg-white dark:bg-gray-900 w-full min-h-screen pt-40">
            <form
              className="mx-auto ml-10 max-w-screen-md"
              onSubmit={handleSubmit(submitHandler)}
            >
              <h1 className="mb-4 text-xl dark:text-white text-gray-900">
                Login
              </h1>
              <div className="mb-4">
                <label
                  htmlFor="email "
                  className="dark:text-white text-gray-900"
                >
                  Email
                </label>
                <input
                  className="w-fit block border dark:border-gray-700 rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
                  type="email"
                  {...register("email", {
                    required: "Please enter email",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: "Please enter valid email",
                    },
                  })}
                  id="email"
                  placeholder="Enter Email"
                  autoFocus
                ></input>
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>
              <div className="mb-4 ">
                <label
                  className="dark:text-white text-gray-900"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Please enter password",
                    minLength: {
                      value: 6,
                      message: "password should be more than 5 chars",
                    },
                  })}
                  className="w-fit block dark:border-gray-700 border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
                  id="password"
                  placeholder="Enter Password"
                  autoFocus
                ></input>
                {errors.password && (
                  <div className="text-red-500 ">{errors.password.message}</div>
                )}
              </div>
              <div className="mb-4">
                {loading ? (
                  <div className="lg:w-4/12 w-8/12">
                    {" "}
                    <Loading />
                  </div>
                ) : (
                  <div className="flex flex-row">
                    <button className=" flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Login
                    </button>
                    <button
                      onClick={handleSignInWithGoogle}
                      className="ml-3 flex items-center text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Sign in with Google
                    </button>
                  </div>
                )}
              </div>
              <div className="dark:text-white text-gray-900">
                Don&apos;t have an account? &nbsp;
                <NavLink
                  to="/signup"
                  className="mt-3 text-blue-600 hover:underline sm:mx-3 sm:mt-0"
                >
                  Register
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
