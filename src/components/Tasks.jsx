import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import { auth, db } from "../firebase";
import Loading from "../components/Loading";
function Tasks() {
  const { user } = useContext(UserContext);
  return (
    <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start px-2">
      <div className="w-full p-2 lg:w-1/2">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 sm:h-80 h-60">
          <Quoter />
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/2">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 h-80">
          <Badger />
        </div>
      </div>

      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 h-80">
          <NoteMaker />
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 h-80">
          <Notes />
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 overflow-hidden h-80">
          <Profile />
        </div>
      </div>
    </div>
  );
}

function Quoter() {
  return (
    <div className="flex p-4 h-full flex-col">
      <div className="">
        <div className="flex items-center">
          <div className="font-bold text-zinc-700 dark:text-white">
            Daily Quotes
          </div>
          <div className="flex-grow" />

          <div className="ml-2 text-zinc-600 dark:text-gray-200">
            Stay Motivated
          </div>
        </div>
        {/* <div className="font-bold ml-5 text-zinc-600 dark:text-gray-200">
        Stay Happy!
      </div> */}
      </div>

      <div className="flex-grow"></div>
    </div>
  );
}
function Badger() {
  return (
    <div className="flex p-4 flex-col h-full">
      <h1 className="text-2xl font-medium mb-4 text-zinc-700 dark:text-white">
        Your Badges
      </h1>

      <div className="flex-grow" />
    </div>
  );
}

function NoteMaker() {
  return (
    <div className="p-4 h-full">
      <div className="flex flex-col items-center">
        <div className="text-zinc-700 dark:text-white font-bold">
          Write a note
        </div>
      </div>
      <div className="-mt-1 text-zinc-600 dark:text-gray-200 italic">
        most recently
      </div>
    </div>
  );
}

function Notes() {
  return (
    <div className="p-4 h-full overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="text-zinc-700 dark:text-white font-bold">
          Your Notes
        </div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div>
      <div className="h-full " />
      <div className="flex flex-col items-center">
        <div className="text-zinc-700 dark:text-white font-bold mt-3">
          Profile
        </div>
      </div>
    </div>
  );
}

export default Tasks;
