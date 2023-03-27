import React from 'react'
import Footer from '../components/Footer'
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
function Login() {
    
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
      setLoading(false);
    } catch (err) {
      toast.error(getError(err));
    }
    return loading;
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    
    <div className=" dark:bg-zinc-900 bg-white w-full min-h-screen">
      
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-xl">Login</h1>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              className="w-full border dark:border-gray-700 rounded-md pl-10 pr-4 py-2 focus:border-green-500 focus:outline-none focus:shadow-outline"
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
          <div className="mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Please enter password",
                minLength: {
                  value: 6,
                  message: "password should be more than 5 chars",
                },
              })}
              className="w-full dark:border-gray-700 border rounded-md pl-10 pr-4 py-2 focus:border-green-500 focus:outline-none focus:shadow-outline"
              id="password"
              placeholder="Enter Password"
              autoFocus
            ></input>
            {errors.password && (
              <div className="text-red-500 ">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-4 ">
            <button className="ml-3 flex items-center px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500">
              Login
            </button>
          </div>
          <div>
            Don&apos;t have an account? &nbsp;
            <a
              href=""
              className="mt-3 text-blue-600 hover:underline sm:mx-3 sm:mt-0"
            >
              Register
            </a>
          </div>
        </form>
      <Footer />
    </div>
  </div>
  )
}

export default Login
