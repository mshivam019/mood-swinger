import { auth, db } from "../firebase";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../utils/UserContext";
import { signOut } from "firebase/auth";
import logo from "../assets/logo.png";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import useDarkSide from "../utils/useDarkSide";
import SidebarIcons from "../components/sideBarIcons";
import { useCollection } from "react-firebase-hooks/firestore";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { collection, query, where, orderBy } from "firebase/firestore";
import Tasks from "../components/Tasks";
import Overview from "../components/Overview";
import Dashy from "../components/Dashy";
import Settings from "../components/Settings";
const sidebarItems = [
  [
    { id: "0", title: "Dashboard", notifications: false },
    { id: "1", title: "Overview", notifications: false },
    { id: "4", title: "Tasks", notifications: false },
    { id: "6", title: "Settings", notifications: false },
  ],
];
function Dashboard() {
  function Sidebar({ onSidebarHide, showSidebar, selected, setSelected }) {
    const navigateTo = useNavigate();
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

    return (
      <div
        className={clsx(
          "fixed inset-y-0 left-0 bg-zinc-300 dark:bg-zinc-900 w-full sm:w-20 xl:w-60 sm:flex flex-col z-10",
          showSidebar ? "flex" : "hidden"
        )}
      >
        <div className="flex-shrink-0 overflow-hidden p-2">
          <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 border-b border-solid border-gray-700">
            <NavLink to="/dashboard">
              <img src={logo} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
            </NavLink>
            <NavLink to="/">
              <div className="block sm:hidden xl:block ml-2 font-bold text-xl text-black dark:text-white">
                Mood Swinger
              </div>
            </NavLink>
            <div className="flex-grow block sm:hidden xl:block" />
            <XMarkIcon
              className="block sm:hidden w-5 h-5 mt-2"
              onClick={onSidebarHide}
            />
          </div>
        </div>
        <div className="flex-grow overflow-x-hidden overflow-y-auto flex flex-col mr-1 justify-items-center">
          {sidebarItems[0].map((i) => (
            <MenuItem
              key={i.id}
              item={i}
              sidebar={onSidebarHide}
              onClick={setSelected}
              selected={selected}
            />
          ))}
        </div>

        <div className="flex-shrink-0 overflow-hidden p-2">
          <div className="flex items-center h-full sm:justify-center xl:justify-start  border-t border-solid border-gray-700">
            <div className="block xl:block my-2 w-full">
              <button
                onClick={signout}
                className="block w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Log out
              </button>
            </div>
            <div className="flex-grow block sm:hidden xl:block" />
          </div>
        </div>
      </div>
    );
  }
  function MenuItem({
    item: { id, title, notifications },
    onClick,
    selected,
    sidebar,
  }) {
    return (
      <div
        className={clsx(
          "w-full mt-6 flex items-center px-3 sm:px-0 xl:px-3 justify-start sm:justify-center xl:justify-start sm:mt-6 xl:mt-3 cursor-pointer border-r-2 border-solid dark:hover:bg-zinc-500 hover:bg-zinc-200 rounded p-2 my-3 space-y-3 pl-0.5",
          selected === id
            ? "border-black dark:border-white text-black dark:text-white dark:bg-zinc-800 bg-zinc-200"
            : "border-transparent text-zinc-600 hover:text-zinc-900 dark:hover:text-gray-300"
        )}
        onClick={() => {
          sidebar();
          onClick(id);
        }}
      >
        <SidebarIcons id={id} />
        <div className="block sm:hidden xl:block ml-2 pb-2">{title}</div>
        <div className="block sm:hidden xl:block flex-grow" />
        {notifications && (
          <div className=" sm:hidden xl:flex bg-pink-600  w-5 h-5 flex items-center justify-center rounded-full mr-2">
            <div className="text-black dark:text-white text-sm">
              {notifications}
            </div>
          </div>
        )}
      </div>
    );
  }

  function Content({ onSidebarHide, selected, moods, averageMood }) {
    let content = null;
    switch (selected) {
      case "0":
        content = <Dashy moods={moods} averageMood={averageMood} />;
        break;
      case "1":
        content = <Overview moods={moods} />;
        break;
      case "4":
        content = <Tasks moods={moods} />;
        break;
      case "6":
        content = <Settings />;
        break;
      default:
        content = null;
    }
    const [colorTheme, setTheme] = useDarkSide();
    const currentDate = new Date().toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    const toggleDarkMode = () => {
      const newTheme = colorTheme === "dark" ? "light" : "dark";
      localStorage.theme = newTheme;
      setTheme(newTheme);
    };

    const renderThemeChanger = () => {
      return (
        <button onClick={toggleDarkMode}>
          {colorTheme === "dark" ? (
            <SunIcon className="w-6 h-6 text-yellow-500" />
          ) : (
            <MoonIcon className="w-6 h-6 text-gray-900" />
          )}
        </button>
      );
    };
    return (
      <div className="flex w-full ">
        <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
          .
        </div>
        <div className=" h-screen flex-grow overflow-x-hidden flex flex-wrap content-start px-2">
          <div className="w-full sm:flex p-2 items-end">
            <div className="sm:flex-grow flex justify-between">
              <div className="">
                <div className="flex items-center">
                  <div className="text-3xl font-bold text-black dark:text-white">
                    Hello {name}! 👋
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="ml-2 text-zinc-600 dark:text-gray-400">
                    {currentDate}
                  </div>
                </div>
              </div>
              <Bars3Icon
                className="block sm:hidden w-5 h-5 mt-3"
                onClick={onSidebarHide}
              />
            </div>
            <div className="w-min  sm:w-fit sm:mt-0 relative flex justify-end ml-auto dark:bg-zinc-700 bg-zinc-300 rounded p-2">
              {renderThemeChanger()}
            </div>
          </div>
          {content}
        </div>
      </div>
    );
  }

  const [moods, setMoods] = useState([]);
  const [averageMood, setAverageMood] = useState(null);
  const navigateTo = useNavigate();
  const location = useLocation();

  const { setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const uid = user.uid;
  const name = user.displayName;
  const moodsCollection = collection(db, "moods");
  useEffect(() => {
    if (user === null) {
      if (location.pathname === "/dashboard") {
        toast.error("Please login or Sign up", {
          toastId: "auth",
        });
        navigateTo("/login");
      }
    }
  }, [name]);

  const [snapshot] = useCollection(
    query(
      moodsCollection,
      where("userId", "==", `${uid}`),
      orderBy("timestamp", "desc")
    )
  );

  useEffect(() => {
    if (snapshot) {
      setMoods(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    }
  }, [snapshot]);
  const [showSidebar, onSetShowSidebar] = useState(false);
  const [selected, setSelected] = useState("0");
  return (
    <div>
      <div className=" bg-white dark:bg-gray-900 min-h-screen">
        <div className="flex bg-gray-200 dark:bg-zinc-800 text-gray-400">
          <Sidebar
            onSidebarHide={() => {
              onSetShowSidebar(false);
            }}
            showSidebar={showSidebar}
            selected={selected}
            setSelected={setSelected}
          />
          <Content
            onSidebarHide={() => {
              onSetShowSidebar(true);
            }}
            moods={moods}
            averageMood={averageMood}
            selected={selected}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
