import { auth, db } from "../firebase";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { PieChart } from "react-minimal-pie-chart";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import React, { useState, useEffect,useContext } from "react";
import UserContext from "../utils/UserContext";
import { signOut, onAuthStateChanged } from "firebase/auth";
import logo from "../assets/logo.png";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import useDarkSide from "../utils/useDarkSide";
import SidebarIcons from "../components/sideBarIcons";
import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useCollection } from "react-firebase-hooks/firestore";
import "../index.css";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import Tasks from "../components/Tasks";
const sidebarItems = [
  [
    { id: "0", title: "Dashboard", notifications: false },
    { id: "4", title: "Tasks", notifications: false },
  ],
];
function getCurrentDateTime() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const meridian = hours >= 12 ? 'PM' : 'AM';

  return `${month}/${day}/${year} ${hours % 12}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${meridian}`;
}

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
  function Dashy() {
    return (
      <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start px-2">
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
      </div>
    );
  }
  function Content({ onSidebarHide, selected }) {
    let content = null;
    switch (selected) {
      case "0":
        content = <Dashy />;
        break;
      case "4":
        content = <Tasks/>;
        break;
      default:
        content = null;
    }
    const [colorTheme, setTheme] = useDarkSide();
    const [darkmode, Setdarkmode] = useState(true);
    const currentDate = new Date().toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
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
  function Graph() {
    const formatTimestamp = (timestamp) => {
      const [date, time] = timestamp.split(" ");
      const [month, day, year] = date.split("/");
      return `${month}/${day}`;
    };

    const data = moods.map((mood) => ({
      name: formatTimestamp(mood.date),
      mood: mood.mood,
    }));

    return (
      <div className="flex p-4 h-full flex-col lg:overflow-hidden overflow-scroll">
        <div className="">
          <div className="flex items-center">
            <div className="font-bold text-zinc-700 dark:text-white">
              Your Progress Summary
            </div>
            <div className="flex-grow" />

            <div className="ml-2 text-zinc-600 dark:text-gray-200 italic">
              from recent to oldest
            </div>
          </div>
        </div>
        {moods.length > 0 ? (
          <div className="block -ml-4 pt-5">
            <LineChart width={790} height={280} data={data}>
              <XAxis dataKey="name" axisLine={false} tick={false} />
              <YAxis
                type="number"
                domain={[1, 10]}
                tick={false}
                axisLine={false}
              />

              <Tooltip
                labelFormatter={(label) => formatTimestamp(label)}
                formatter={(value) => getEmoji(value)}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </div>
        ) : (
          <div className="text-zinc-400 dark:text-zinc-500">
            add your moods to see your progress here as a graph
          </div>
        )}
        <div className="flex-grow"></div>
      </div>
    );
  }
  function TopCountries() {
    const [currentMood, setCurrentMood] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleMoodChange = (e) => {
      setCurrentMood(e.target.value);
    };

    const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!currentMood || !description) {
        setErrorMessage("Please select a mood and enter a description");
        return;
      }

      try {
        const moodsCollection = collection(db, "moods");
        await addDoc(moodsCollection, {
          mood: Number(currentMood),
          userId: uid,
          date: getCurrentDateTime(),
          description: description,
        });
        setCurrentMood("");
        setDescription("");
        setErrorMessage("");
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <div className="flex p-4 flex-col h-full">
        <form onSubmit={handleSubmit} className=" items-center justify-center">
          <div className=" rounded-lg  p-1">
            <h1 className="text-3xl font-medium mb-4 text-zinc-700 dark:text-white">
              How are you feeling?
            </h1>
            <div className="flex justify-between">
              <button
                type="button"
                className={clsx(
                  " dark:hover:bg-blue-200 hover:bg-blue-200 rounded-md  p-1 mr-1 ",
                  currentMood === "10"
                    ? "dark:bg-blue-300 bg-blue-300"
                    : " dark:bg-zinc-800 bg-gray-200"
                )}
                value="10"
                onClick={handleMoodChange}
              >
                😁
              </button>
              <button
                type="button"
                className={clsx(
                  " dark:hover:bg-blue-200 hover:bg-blue-200 rounded-md  p-1 mr-1 ",
                  currentMood === "8"
                    ? "dark:bg-blue-300 bg-blue-300"
                    : " dark:bg-zinc-800 bg-gray-200"
                )}
                value="8"
                onClick={handleMoodChange}
              >
                😊
              </button>
              <button
                type="button"
                className={clsx(
                  " dark:hover:bg-blue-200 hover:bg-blue-200 rounded-md  p-1 mr-1 ",
                  currentMood === "6"
                    ? "dark:bg-blue-300 bg-blue-300"
                    : " dark:bg-zinc-800 bg-gray-200"
                )}
                value="6"
                onClick={handleMoodChange}
              >
                🙂
              </button>
              <button
                type="button"
                className={clsx(
                  " dark:hover:bg-blue-200 hover:bg-blue-200 rounded-md  p-1 mr-1 ",
                  currentMood === "4"
                    ? "dark:bg-blue-300 bg-blue-300"
                    : " dark:bg-zinc-800 bg-gray-200"
                )}
                value="4"
                onClick={handleMoodChange}
              >
                😐
              </button>
              <button
                type="button"
                className={clsx(
                  " dark:hover:bg-blue-200 hover:bg-blue-200 rounded-md  p-1 mr-1 ",
                  currentMood === "2"
                    ? "dark:bg-blue-300 bg-blue-300"
                    : " dark:bg-zinc-800 bg-gray-200"
                )}
                value="2"
                onClick={handleMoodChange}
              >
                😔
              </button>
              <button
                type="button"
                className={clsx(
                  " dark:hover:bg-blue-200 hover:bg-blue-200 rounded-md  p-1 mr-1 ",
                  currentMood === "1"
                    ? "dark:bg-blue-300 bg-blue-300"
                    : " dark:bg-zinc-800 bg-gray-200"
                )}
                value="1"
                onClick={handleMoodChange}
              >
                😢
              </button>
            </div>
            <div className="mt-4">
              <label
                className="text-lg font-medium text-zinc-700 dark:text-white"
                htmlFor="description"
              >
                Brief description
              </label>
              <textarea
                id="description"
                className="w-full dark:bg-zinc-800 bg-zinc-400  text-black dark:text-white h-20 rounded-md border-gray-300 mt-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700"
              >
                Submit
              </button>
              {errorMessage && (
                <p className="text-red-600 mt-2">{errorMessage}</p>
              )}
            </div>
          </div>
        </form>
        <div className="flex-grow" />
      </div>
    );
  }
  const getEmoji = (moodValue) => {
    switch (moodValue) {
      case 10:
        return "😁";
      case 8:
        return "😊";
      case 6:
        return "🙂";
      case 4:
        return "😐";
      case 2:
        return "😔";
      case 1:
        return "😢";
      default:
        return "❓";
    }
  };

  function Segmentation() {
    return (
      <div className="p-4 h-full">
        <div className="flex flex-col items-center">
          <div className="text-zinc-700 dark:text-white font-bold">Moods</div>
        </div>
        <div className="-mt-1 text-zinc-600 dark:text-gray-200 italic">
          most recently
        </div>
        <dl className="text-sm text-zinc-600 dark:text-white block ">
          {moods.length > 0 ? (
            moods.slice(0, 8).map((mood) => (
              <div key={mood.id}>
                <dt className="font-thin my-2">
                  {getEmoji(mood.mood)}
                  {" : "} {mood.description}
                </dt>
              </div>
            ))
          ) : (
            <div className="text-zinc-400 dark:text-zinc-500">
              add your moods to see most recent ones here
            </div>
          )}
        </dl>
      </div>
    );
  }

  function Satisfication() {
    const percentage = parseInt((averageMood / 10) * 100);
    const roundedMood = Math.round(averageMood / 2) * 2;
    return (
      <div className="p-4 h-full overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="text-zinc-700 dark:text-white font-bold">
            Average Mood
          </div>
        </div>
        <div className="mx-auto mt-4" style={{ width: 275 }}>
          <CircularProgressbarWithChildren
            circleRatio={0.75}
            value={percentage}
            strokeWidth={5}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)

              rotation: 1 / 2 + 1 / 8,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "round",
              pathColor: `rgba(31, 81, 255, ${percentage / 100})`,
              trailColor: "#ffffff",
              backgroundColor: "#3e98c7",
            })}
          >
            <div
              className={clsx(
                "text-4xl",
                percentage >= 50 ? "text-blue-600" : "text-red-600"
              )}
            >
              {getEmoji(roundedMood)}
              {percentage}%
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>
    );
  }

  function AddComponent() {
    const moodCounts = {};
    moods.forEach((mood) => {
      const label = getEmoji(mood.mood);
      moodCounts[label] = (moodCounts[label] || 0) + 1;
    });

    const moodLabels = Object.keys(moodCounts);
    const moodValues = Object.values(moodCounts);
    const totalMoods = moodValues.reduce((total, count) => total + count, 0);

    const chartData = moodValues.map((value, index) => ({
      title: moodLabels[index],
      value: value,
      percentage: Math.round((value / totalMoods) * 100),
      color: ["#36A2EB", "#2ecc71", "#FF6384", "#9b59b6", "#e74c3c", "#FFCE56"][
        index % 6
      ],
    }));

    return (
      <div>
        <div className="h-full " />
        <div className="flex flex-col items-center">
          <div className="text-zinc-700 dark:text-white font-bold mt-3">
            Pie chart
          </div>

          {moods.length > 0 ? (
            <div className="flex items-center mt-3">
              <div style={{ width: 260 }}>
                <PieChart
                  data={chartData}
                  label={({ dataEntry }) => `${dataEntry.title}`}
                  labelStyle={{ fontSize: "10px", fontFamily: "sans-serif" }}
                />
              </div>
              <div className="ml-1">
                {chartData.map((dataEntry, index) => (
                  <div key={index}>
                    {/* <span
                  className="inline-block rounded-full w-3 h-3 mr-2"
                  style={{ backgroundColor: dataEntry.color }}
                ></span> */}
                    <span>{dataEntry.title}:</span>
                    <span className=" dark:text-white text-black">
                      {dataEntry.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-zinc-400 dark:text-zinc-500">
              add your moods to see a pie chart
            </div>
          )}
        </div>
      </div>
    );
  }

  // const [user, setUser] = useState(null);
  // const [uid, setUid] = useState(null);
  const [moods, setMoods] = useState([]);
  const [averageMood, setAverageMood] = useState(null);
  // const [name, setName] = useState(null);
  const navigateTo = useNavigate();
  const location = useLocation();
  
  const { setUser } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const uid = user.uid;
  const name = user.displayName;
  const moodsCollection = collection(db, "moods");
  useEffect(() => {
    // const user = currentUser(auth);
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     setUser(user);
    //     console.log(user.displayName);
    //     console.log(user.uid);
    //     setUid(user.uid);
    //     setName(user.displayName);
    //   } else {
    //     setUser(null);
        
    //   }
    // });
    console.log(user.displayName);
    if(user===null) {
    if (location.pathname === "/dashboard") {
      toast.error("Please login or Sign up", {
        toastId: "auth",
      });
      navigateTo("/login");
    }
  }
    // return () => unsubscribe();
  }, []);

  const [snapshot] = useCollection(
    query(
      moodsCollection,
      where("userId", "==", `${uid}`),
      orderBy("date", "desc")
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
      let totalMood = 0;
      snapshot.forEach((doc) => {
        const mood = doc.data().mood;
        totalMood += mood;
      });

      const avgMood = totalMood / snapshot.size;
      setAverageMood(avgMood);
      console.log("1");
    }
  }, [snapshot]);
  const [showSidebar, onSetShowSidebar] = useState(false);
  const [selected, setSelected] = useState("0");

  return (
    <div>
      <div className=" bg-white dark:bg-gray-900 min-h-screen">
        {/*  */}
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