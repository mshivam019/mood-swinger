import React from 'react'

function Tasks() {
  return (
    <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start px-2">
      <div className="w-full p-2 lg:w-1/2">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 sm:h-80 h-60">
          <Activities />
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/2">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 sm:h-80 h-60">
          <ToDo />
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/2">
        
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 sm:h-80 h-60">
          <Notes/>
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/2">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 sm:h-80 h-60">
          <Reference/>
        </div>
      </div>
      
    </div>
  )
}
function Activities() {
    return (
        <div className="p-4 h-full">
        <div className="flex flex-col items-center">
          <div className="text-zinc-700 dark:text-white font-bold">Activities</div>
        </div>
        <div className="-mt-1 text-zinc-600 dark:text-gray-200 italic">
          most recently
        </div>
        Hello
      </div>
    );
  }
  
  function ToDo() {
    return (
        <div className="p-4 h-full">
        <div className="flex flex-col items-center">
          <div className="text-zinc-700 dark:text-white font-bold">To do</div>
        </div>
        Hello
      </div>
    );
  }
  function Reference() {
    return (
        <div className="p-4 h-full">
        <div className="flex flex-col items-center">
          <div className="text-zinc-700 dark:text-white font-bold">References</div>
        </div>
        hello
      </div>
    );
  }
  
  function Notes() {
    return (
        <div className="p-4 h-full">
        <div className="flex flex-col items-center">
          <div className="text-zinc-700 dark:text-white font-bold">Notes</div>
        </div>
        hello
      </div>
    );
  }

export default Tasks
