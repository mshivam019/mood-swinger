import React from "react";
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
function Overview(moods) {
  return (
    <div className="h-screen flex-grow min-h-screen overflow-x-hidden overflow-auto flex flex-wrap content-start px-2">
      <div className="w-full min-h-screen p-2">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 h-full">
          <Graph moods={moods} />
        </div>
      </div>
    </div>
  );
}

function Graph({ moods }) {
  return (
    <div className="flex p-4 h-full flex-col">
      <div className="">
        <div className="flex items-center">
          <div className="font-bold text-zinc-700 dark:text-white">
            Your moods
          </div>
          <div className="flex-grow" />
          <div className="ml-2 text-zinc-600 dark:text-gray-200">Overview</div>
        </div>
        <div className="font-bold ml-5 text-zinc-600 dark:text-gray-200">
          Recent to oldest
        </div>
      </div>
      <dl className="text-sm text-zinc-600 dark:text-white block ">
        {moods.moods.length > 0 ? (
          moods.moods.map((mood) => (
            <div key={mood.id}>
              <dt className="font-thin my-2">
                {getEmoji(mood.mood)}
                {" : "} {mood.description}
                {" : "}
                {mood.date}
              </dt>
            </div>
          ))
        ) : (
          <div className="text-zinc-400 dark:text-zinc-500">
            add your moods to see most recent ones here
          </div>
        )}
      </dl>
      <div className="flex-grow"></div>
    </div>
  );
}

export default Overview;
