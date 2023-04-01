import React from "react";

function Dasher() {
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

function Graph() {
  return (
    <div className="flex p-4 h-full flex-col">
      <div className="">
        <div className="flex items-center">
          <div className="font-bold text-zinc-700 dark:text-white">
            Your Progress Summary
          </div>
          <div className="flex-grow" />

          <div className="ml-2 text-zinc-600 dark:text-gray-200">
            Last 9 Months
          </div>
        </div>
        <div className="font-bold ml-5 text-zinc-600 dark:text-gray-200">
          Nov - July
        </div>
      </div>

      <div className="flex-grow"></div>
    </div>
  );
}
function TopCountries() {
  return (
    <div className="flex p-4 flex-col h-full">
      <h1 className="text-3xl font-medium mb-4 text-zinc-700 dark:text-white">
        How are you feeling?
      </h1>

      <div className="flex-grow" />
    </div>
  );
}

function Segmentation() {
  return (
    <div className="p-4 h-full">
      <div className="flex flex-col items-center">
        <div className="text-zinc-700 dark:text-white font-bold">Moods</div>
      </div>
      <div className="-mt-1 text-zinc-600 dark:text-gray-200 italic">
        most recently{" "}
      </div>
    </div>
  );
}

function Satisfication() {
  return (
    <div className="p-4 h-full overflow-hidden">
      <div className="flex flex-col items-center">
        <div className="text-zinc-700 dark:text-white font-bold">
          Average Mood
        </div>
      </div>
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

export default Dasher;
