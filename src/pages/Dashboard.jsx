import { auth, db } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import React, { useState, useEffect } from "react";
import {signOut, onAuthStateChanged } from "firebase/auth";
import logo from "../assets/logo.png";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import useDarkSide from "../utils/useDarkSide";
import SidebarIcons from "../components/sideBarIcons";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  serverTimestamp,
  orderBy,
  limit,
} from "firebase/firestore";
import Dasher from "../components/Dasher";
const sidebarItems = [
  [
    { id: "0", title: "Dashboard", notifications: false },
    { id: "1", title: "Overview", notifications: false },
    { id: "4", title: "Tasks", notifications: false },
    { id: "6", title: "Settings", notifications: false },
  ],
];

function Dashboard() {
  
function Sidebar({ onSidebarHide, showSidebar , selected, setSelected}) {
  
  const navigateTo = useNavigate();
  const signout = () => {
   
    signOut(auth)
      .then(() => {
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
          <img src={logo} className="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
          <div className="block sm:hidden xl:block ml-2 font-bold text-xl text-black dark:text-white">
            Mood Swinger
          </div>
          <div className="flex-grow block sm:hidden xl:block" />
          <IconButton
            icon="res-react-dash-sidebar-close"
            className="block sm:hidden"
            onClick={onSidebarHide}
          />
        </div>
      </div>
      <div className="flex-grow overflow-x-hidden overflow-y-auto flex flex-col mr-1 justify-items-center">
        {sidebarItems[0].map((i) => (
          <MenuItem
            key={i.id}
            item={i}
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
function MenuItem({ item: { id, title, notifications }, onClick, selected }) {
  return (
    <div
      className={clsx(
        "w-full mt-6 flex items-center px-3 sm:px-0 xl:px-3 justify-start sm:justify-center xl:justify-start sm:mt-6 xl:mt-3 cursor-pointer border-r-2 border-solid dark:hover:bg-zinc-500 hover:bg-zinc-200 rounded p-2 my-3 space-y-3 pl-0.5",
        selected === id ? "border-black dark:border-white text-black dark:text-white" : "border-transparent text-zinc-600 hover:text-zinc-900 dark:hover:text-gray-300"
      )}
      onClick={() => onClick(id)}
    >
      <SidebarIcons id={id} />
      <div className="block sm:hidden xl:block ml-2 pb-2">{title}</div>
      <div className="block sm:hidden xl:block flex-grow" />
      {notifications && (
        <div className=" sm:hidden xl:flex bg-pink-600  w-5 h-5 flex items-center justify-center rounded-full mr-2">
          <div className="text-black dark:text-white text-sm">{notifications}</div>
        </div>
      )}
    </div>
  );
}
function Dashy(){
  return(<div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start px-2">
    
    <div className="w-full p-2 lg:w-2/3">
          <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 sm:h-80 h-60">
            <Graph />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 h-80">
            <TopCountries />
          </div>
        </div>

        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 h-80">
            <Segmentation />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 h-80">
            <Satisfication />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 overflow-hidden h-80">
            <AddComponent />
          </div>
        </div>
  </div>)
}
function Content({ onSidebarHide, selected }) {
  let content = null;
  switch (selected) {
    case "0":
      content = <Dashy/>;
      break;
    case "1":
      content = <div>Overview content</div>;
      break;
    
    case "4":
      content = <div>Tasks content</div>;
      break;
    
    case "6":
      content = <div>Settings content</div>;
      break;
    default:
      content = null;
  }
  const [colorTheme, setTheme] = useDarkSide();
  const [darkmode, Setdarkmode] = useState(true);
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
          className="w-6 h-6 text-yellow-500 "
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
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        .
      </div>
      <div className=" h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start px-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between">
            <div className="">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-black dark:text-white">Hello {name}!</div>
              </div>
              <div className="flex items-center">
                <div className="ml-2 text-zinc-600 dark:text-gray-400">October 26</div>
              </div>
            </div>
		          <IconButton
              icon="res-react-dash-sidebar-open"
              className="block sm:hidden"
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
function Graph() {
  return (
    <div className="flex p-4 h-full flex-col">
      <div className="">
        <div className="flex items-center">
          <div className="font-bold text-zinc-700 dark:text-white">Your Progress Summary</div>
          <div className="flex-grow" />

          <div className="ml-2 text-zinc-600 dark:text-gray-200">Last 9 Months</div>
        </div>
        <div className="font-bold ml-5 text-zinc-600 dark:text-gray-200">Nov - July</div>
      </div>

      <div className="flex-grow"></div>
    </div>
  );
}

function TopCountries() {
  return (
    <div className="flex p-4 flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="text-zinc-700 dark:text-white font-bold">Moods</div>
      </div>
      <div className="text-zinc-600 italic dark:text-gray-200">most recently</div>
      <dl className="text-sm text-zinc-600 dark:text-white block">
        {moods.map((mood) => (
          <div key={mood.id}><dt className="font-thin">{mood.mood}{" : "} {mood.description}</dt></div>
        ))}
      </dl>
      <div className="flex-grow" />
    </div>
  );
}

function Segmentation() {
  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center">
        <div className="text-zinc-700 dark:text-white font-bold">Segmentation</div>
      </div>
      <div className="mt-3 text-zinc-600 dark:text-gray-200">Bar Graph</div>
    </div>
  );
}

function Satisfication() {
  
  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center">
        <div className="text-zinc-700 dark:text-white font-bold">Satisfication</div>
      </div>
      <div className="mt-3 text-zinc-600 dark:text-gray-200">circular meter</div>
      
    </div>
  );
}

function AddComponent() {
  return (
    <div>
      <div className="h-full " />
      <div className="flex flex-col items-center">
        <div className="text-zinc-700 dark:text-white font-bold mt-3">
          Pie chart
        </div>
      </div>
    </div>
  );
}

function IconButton({
  onClick = () => {},
  icon = 'options',
  className = 'w-4 h-4',
}) {
  return (
    <button onClick={onClick} type="button" className={className}>
      <img
        src={`https://assets.codepen.io/3685267/${icon}.svg`}
        alt=""
        className="w-full h-full"
      />
    </button>
  );
}
  const [user, setUser] = useState(null);
  const [currentMood, setCurrentMood] = useState("Happy");
  const [currentMoodDes, setCurrentMoodDes] = useState("bad day");
  const [uid, setUid] = useState(null);
  const [moods, setMoods] = useState([]);
  const [name, setName] = useState(null);
  const navigateTo = useNavigate();
  const location = useLocation();

  const moodsCollection = collection(db, "moods");
  useEffect(() => {
    // const user = currentUser(auth);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user.displayName);
        console.log(user.uid);
        setUid(user.uid);
        setName(user.displayName);
      } else {
        setUser(null);
        if (location.pathname === "/dashboard") {
          toast.error("Please login or Sign up", {
            toastId: "auth",
          });
          navigateTo("/login");
        }
      }
    });
    return () => unsubscribe();
  }, []);
  const storeData = async () => {
    const docRef = await addDoc(moodsCollection, {
      mood: currentMood,
      userId: uid,
      timestamp: serverTimestamp(),
      description: currentMoodDes,
    }).then(() => {
      setCurrentMood("");
      setCurrentMoodDes("");
    });
  };
  const q = query(
    moodsCollection,
    where("userId", "==", uid),
    orderBy("timestamp", "desc"),
    limit(7)
  );
  useEffect(() => {
    const getmoods = async () => {
      const data = await getDocs(moodsCollection,q);
      setMoods(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getmoods();
  }, []);
  const [showSidebar, onSetShowSidebar] = useState(false);
  const [selected, setSelected] = useState("0");

  return (
    <div>
      <div className=" bg-white dark:bg-gray-900 min-h-screen">
      {/* <button className=" flex items-center text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={storeData}>Store</button> */}
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
        selected={selected}
      />
    </div>
      </div>
    </div>
  );
}

export default Dashboard;
