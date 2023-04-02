import React, { useEffect, useState, useContext } from "react";

import UserContext from "../utils/UserContext";
import { db } from "../firebase";
import clsx from "https://cdn.skypack.dev/clsx@1.1.1";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { collection, addDoc } from "firebase/firestore";

import { PieChart } from "react-minimal-pie-chart";

function getCurrentDateTime() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const meridian = hours >= 12 ? "PM" : "AM";

  return `${month}/${day}/${year} ${hours % 12}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds} ${meridian}`;
}

function Dashy(moods) {
  return (
    <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start px-2">
      <div className="w-full p-2 lg:w-2/3">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 sm:h-80 h-60">
          <Graph moods={moods} />
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 h-80">
          <MoodEntry />
        </div>
      </div>

      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 h-80">
          <MoodList moods={moods} />
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 h-80">
          <AverageMood moods={moods} />
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 overflow-hidden h-80">
          <MoodPie moods={moods} />
        </div>
      </div>
    </div>
  );
}

function Graph({ moods }) {
  const formatTimestamp = (timestamp) => {
    const [date, time] = timestamp.split(" ");
    const [month, day, year] = date.split("/");
    return `${day}/${month}`;
  };

  const data = moods.moods.map((mood) => ({
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
      {moods.moods.length > 0 ? (
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
function MoodEntry() {
  const { user } = useContext(UserContext);
  const uid = user.uid;
  const name = user.displayName;
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
          <h1 className="text-2xl font-medium mb-4 text-zinc-700 dark:text-white">
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

function MoodList({ moods }) {
  return (
    <div className="p-4 h-full">
      <div className="flex flex-col items-center">
        <div className="text-zinc-700 dark:text-white font-bold">Moods</div>
      </div>
      <div className="-mt-1 text-zinc-600 dark:text-gray-200 italic">
        most recently
      </div>
      <dl className="text-sm text-zinc-600 dark:text-white block ">
        {moods.moods.length > 0 ? (
          moods.moods.slice(0, 8).map((mood) => (
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

function AverageMood({ moods }) {
  let totalMood = 0;
  let count = 0;
  moods.moods.forEach((mood) => {
    count++;
    totalMood += mood.mood;
  });

  const avgMood = totalMood / count;
  const percentage = parseInt((avgMood / 10) * 100);
  const roundedMood = Math.round(avgMood / 2) * 2;
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
            rotation: 1 / 2 + 1 / 8,
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

function MoodPie({ moods }) {
  const moodCounts = {};
  moods.moods.map((mood) => {
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

        {moods.moods.length > 0 ? (
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
export default Dashy;
