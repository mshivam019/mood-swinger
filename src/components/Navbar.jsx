import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

import UserContext from "../utils/UserContext";
import React, { useState, useEffect,useContext } from "react";
import useDarkSide from "../utils/useDarkSide";
import logo from "../assets/logo.png";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
function Navbar(props) {
  const navigateTo = useNavigate();
  const location = useLocation();
  const [t, sett] = useState(true);
  
  const { setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [colorTheme, setTheme] = useDarkSide();
  //const [user, setUser] = useState(null);
  useEffect(() => {
    // const user = currentUser(auth);
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     setUser(user);
    //   } else {
    //     setUser(null);
    //   }
    // });
    if (location.pathname === "/dashboard") sett(false);
    // return () => unsubscribe();
  }, []);
  const [darkmode, Setdarkmode] = useState(true);
  const signout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        setUser(null);
        navigateTo("/");
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  };
  const toggleDarkMode = () => {
    if (darkmode === false) {
      setTheme("dark");
      Setdarkmode(true);
    } else {
      setTheme("light");
      Setdarkmode(false);
    }
  };
  const renderThemeChanger = () => {
    if (darkmode) {
      return (
        <SunIcon
          className="w-6 h-6  text-yellow-500 "
          role="button"
          onClick={() => toggleDarkMode()}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-6 h-6  text-gray-900 "
          role="button"
          onClick={() => toggleDarkMode()}
        />
      );
    }
  };
  return (
    <div classame="bg-white dark:bg-gray-900">
      <Disclosure
        as="nav"
        className="fixed z-20 w-full bg-white/90 dark:bg-gray-900/80 backdrop-blur navbar shadow-2xl shadow-gray-600/5 border-b border-gray-100 dark:border-gray-800 peer-checked:navbar-active dark:shadow-none"
      >
        {({ open }) => (
          <>
            <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  {t && (
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  )}
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-1 items-center">
                    <img
                      src={logo}
                      className="h-6 mr-3 sm:h-9"
                      alt="Flowbite Logo"
                    />
                    <Link to="/">
                      <div className="block h-8 w-auto text-black lg:hidden dark:text-white text-2xl font-semibold cursor-pointer">
                        Mood Swinger
                      </div>

                      <div className="hidden h-8 w-auto lg:block text-black dark:text-white text-2xl font-semibold cursor-pointer">
                        Mood Swinger
                      </div>
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {user && t && (
                        <NavLink
                          to="/dashboard"
                          className=" text-gray-700 hover:bg-gray-100  dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white  dark:border-gray-700
                        block px-3 py-2 rounded-md text-base font-medium"
                        >
                          Dashboard
                        </NavLink>
                      )}
                      {props.navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className=" text-gray-700 hover:bg-gray-100  dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white  dark:border-gray-700
                        block px-3 py-2 rounded-md text-base font-medium"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="dark:bg-zinc-700 bg-zinc-300 rounded p-2 mr-1">
                    {renderThemeChanger()}
                  </div>
                  {user ? (
                    <button
                      onClick={signout}
                      className="md:flex hidden text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    >
                      Log out
                    </button>
                  ) : (
                    <NavLink
                      to={props.btnurl}
                      className="md:flex hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {props.btn}
                    </NavLink>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {user && t && (
                  <NavLink
                    to="/dashboard"
                    className=" text-gray-700 hover:bg-gray-100  dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white  dark:border-gray-700
                          block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Dashboard
                  </NavLink>
                )}
                {props.navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className=" text-gray-700 hover:bg-gray-100  dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white  dark:border-gray-700
                    block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
                {user ? (
                  <button
                    onClick={signout}
                    className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    Log out
                  </button>
                ) : (
                  <NavLink
                    to={props.btnurl}
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    {props.btn}
                  </NavLink>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default Navbar;
