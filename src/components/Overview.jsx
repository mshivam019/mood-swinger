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
          <div className="ml-2 text-zinc-600 dark:text-gray-200">History</div>
        </div>
      </div>

      <div className="relative mt-3 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-zinc-200 dark:bg-zinc-600 dark:text-gray-300">
            <tr>
              <th scope="col" className="px-6 py-3">
                Mood
              </th>
              <th scope="col" className="px-4 py-3">
                <div className="flex items-center">Description</div>
              </th>
              <th scope="col" className="px-4 py-3">
                <div className="flex items-center">Date</div>
              </th>
            </tr>
          </thead>

          <tbody>
            {moods.moods.length > 0 ? (
              moods.moods.map((mood) => (
                <tr key={mood.id} className="dark:border-neutral-700 border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {getEmoji(mood.mood)}
                  </th>
                  <td className="px-4 py-4">
                    <div
                      className="max-w-4xl truncate"
                      title={mood.description}
                    >
                      {mood.description}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm ">{mood.date}</td>
                </tr>
              ))
            ) : (
              <div className="text-zinc-400 dark:text-zinc-500">
                add your moods to see them all here
              </div>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex-grow"></div>
    </div>
  );
}

export default Overview;
