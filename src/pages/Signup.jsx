import React,{useState} from "react";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import { auth } from '../firebase';
import { getError } from "../utils/error";
import { createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "firebase/auth";

function Signup() {
  const provider = new GoogleAuthProvider();

  const [loading, setLoading] = useState(true);
  const handleSignInWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth,provider);
      const user = res.user;
      console.log(user);
      // navigate to dashboard
      setLoading(false);
    } 
    catch (err) {
      toast.error(getError(err));
    }
  };
  let props = {
    navigation: [{}],
    btn: "Login",
    btnurl: "/login",
  };
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // navigate to dashboard
      })
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
        <div className="w-full hidden lg:block md:w-1/2 bg-white relative">
          <div className="md:5/12 lg:w-5/12">
            <img
              className="absolute mt-20"
              src="https://tailus.io/sources/blocks/left-image/preview/images/startup.png"
              alt="image"
              loading="lazy"
              width=""
              height=""
            />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-0 scale-25 -mr-0.5 fill-gray-900"
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
                Create Account
              </h1>
              <div className="mb-4">
                <label htmlFor="name" className="dark:text-white text-gray-900">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="lg:w-6/12  w-8/12 block dark:border-gray-700 border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
                  id="name"
                  autoFocus
                  {...register("name", {
                    required: "Please enter name",
                  })}
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="dark:text-white text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Please enter email",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: "Please enter valid email",
                    },
                  })}
                  className="lg:w-6/12  w-8/12 block dark:border-gray-700 border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
                  id="email"
                ></input>
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>
              <div className="mb-4 text-gray-900">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Please enter password",
                    minLength: {
                      value: 6,
                      message: "password should be more than 5 chars",
                    },
                  })}
                  className="lg:w-6/12  w-8/12  block dark:border-gray-700 border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
                  id="password"
                  autoFocus
                ></input>
                {errors.password && (
                  <div className="text-red-500 ">{errors.password.message}</div>
                )}
              </div>
              <div className="mb-4 text-gray-900">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  className="lg:w-6/12  w-8/12 block dark:border-gray-700 border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
                  type="password"
                  placeholder="Re-enter password "
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Please enter confirm password",
                    validate: (value) => value === getValues("password"),
                    minLength: {
                      value: 6,
                      message: "password should be more than 5 chars",
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <div className="text-red-500 ">
                    {errors.confirmPassword.message}
                  </div>
                )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "validate" && (
                    <div className="text-red-500 ">Password do not match</div>
                  )}
              </div>

              <div className="mb-4 flex flex-row">
                <button className="ml-3 flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Register
                </button>
                <button onClick={handleSignInWithGoogle} className="ml-3 flex items-center text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
      Sign in with Google
    </button>
              </div>
              
              <div className="dark:text-white text-gray-900">
                already have an account? &nbsp;
                <NavLink
                  to="/login"
                  className="mt-3 text-blue-600 hover:underline sm:mx-3 sm:mt-0"
                >
                  Login
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

export default Signup;
