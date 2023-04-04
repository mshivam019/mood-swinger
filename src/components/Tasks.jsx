import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/UserContext";
import { auth, db } from "../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import _ from "lodash";
import {
  collection,
  query,
  where,
  orderBy,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
function Tasks(moods) {
  const [notes, setNotes] = useState([]);
  return (
    <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start px-2">
      <div className="w-full p-2 lg:w-2/3">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 sm:h-80 h-60">
          <Quoter />
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 h-80">
          <Moodtr moods={moods} />
        </div>
      </div>

      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 h-80">
          <NoteMaker />
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 h-80">
          <Notes notes={notes} setNotes={setNotes} />
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-zinc-300 dark:bg-zinc-900 overflow-hidden h-80">
          <Profile moods={moods} notes={notes} />
        </div>
      </div>
    </div>
  );
}

function Quoter() {
  const [quote, setQuote] = useState("");
  const [timestamp, setTimestamp] = useState("");
  useEffect(() => {
    const storedQuote = localStorage.getItem("motivationalQuote");
    const storedTimestamp = localStorage.getItem("motivationalQuoteTimestamp");

    if (storedQuote && storedTimestamp) {
      const timestampDiff = Date.now() - parseInt(storedTimestamp);

      if (timestampDiff < 24 * 60 * 60 * 1000) {
        setQuote(storedQuote);
        setTimestamp(storedTimestamp);
        return;
      }
    }

    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        const newQuote = `${data.content} - ${data.author}`;
        const newTimestamp = Date.now().toString();
        setQuote(newQuote);
        setTimestamp(newTimestamp);
        localStorage.setItem("motivationalQuote", newQuote);
        localStorage.setItem("motivationalQuoteTimestamp", newTimestamp);
      });
  }, []);
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

      <blockquote className="text-xl italic -mt-4 lg:mt-5 font-semibold text-gray-900 dark:text-white">
        <svg
          aria-hidden="true"
          className="w-10 h-10 text-gray-400/40 dark:text-gray-600/40"
          viewBox="0 0 24 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
            fill="currentColor"
          />
        </svg>
        <p className="text-md lg:text-lg -mt-2 font-medium lg:my-6">{quote}</p>
      </blockquote>

      <button
        className="bg-blue-600 text-white py-2 lg:mt-4 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        onClick={() => {
          localStorage.removeItem("motivationalQuote");
          localStorage.removeItem("motivationalQuoteTimestamp");

          fetch("https://api.quotable.io/random")
            .then((response) => response.json())
            .then((data) => {
              const newQuote = `${data.content} - ${data.author}`;
              const newTimestamp = Date.now().toString();
              setQuote(newQuote);
              setTimestamp(newTimestamp);
              localStorage.setItem("motivationalQuote", newQuote);
              localStorage.setItem("motivationalQuoteTimestamp", newTimestamp);
            });
        }}
      >
        Get Another Quote
      </button>
      <div className="flex-grow"></div>
    </div>
  );
}
function Moodtr({ moods }) {
  const descriptions = moods.moods.map((mood) => mood.description);
  const allWords = descriptions.join(" ");

  // Get an array of all the words, and count how many times each word appears
  const wordCounts = _.countBy(allWords.split(/\s+/));

  // Get the 10 most common words and sort them alphabetically
  const mostCommonWords = Object.entries(wordCounts)
    .sort(([wordA, countA], [wordB, countB]) => countB - countA)
    .slice(0, 8)
    .map(([word, count]) => word)
    .sort();

  return (
    <div className="p-4 h-full overflow-hidden">
      <h1 className="text-xl font-medium mb-4 text-zinc-700 dark:text-white">
        Your Mood Triggers
      </h1>
      {mostCommonWords.length > 0 ? (
        <ol className="list-decimal pl-2 space-y-1">
          {mostCommonWords.map((word) => (
            <li key={word} className="p-1">
              <p className="text-zinc-700 dark:text-white ">{word}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p>Add some Moods.</p>
      )}
      <div className="flex-grow" />
    </div>
  );
}

function NoteMaker() {
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

  const [note, setNote] = useState("");
  const { user } = useContext(UserContext);
  const uid = user.uid;
  const handleAddNote = async () => {
    if (!note) return;

    try {
      const docRef = await addDoc(collection(db, "notes"), {
        content: note,
        userId: uid,
        timestamp: serverTimestamp(),
        date: getCurrentDateTime(),
      });
      setNote("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="p-4 h-full">
      <div className="flex flex-col items-center">
        <div className="text-zinc-700 dark:text-white font-bold">
          Write a note
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-zinc-700 dark:text-white">
        Add Note
      </h1>
      <textarea
        className="w-full dark:bg-zinc-800 bg-zinc-400 text-black dark:text-white  rounded-md border-gray-300 mt-2 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        rows={4}
        placeholder="Write your note here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600"
        onClick={handleAddNote}
      >
        Add Note
      </button>
    </div>
  );
}

function Notes({ notes, setNotes }) {
  const { user } = useContext(UserContext);
  const uid = user.uid;

  useEffect(() => {
    const notesRef = collection(db, "notes");
    const q = query(
      notesRef,
      where("userId", "==", `${uid}`),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesList = [];
      snapshot.forEach((doc) => {
        notesList.push({ id: doc.id, ...doc.data() });
      });
      setNotes(notesList);
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="p-4 h-full overflow-x-hidden overflow-y-scroll">
      <div className="flex flex-col items-center">
        <div className="text-zinc-700 dark:text-white font-bold">
          Your Notes
        </div>
      </div>
      {notes.length > 0 ? (
        <ol className="space-y-1 list-decimal pl-2">
          {notes.map((note) => (
            <li key={note.id} className="p-1">
              <p className="text-zinc-700 dark:text-white ">{note.content}</p>
            </li>
          ))}
        </ol>
      ) : (
        <p>Add some Notes.</p>
      )}
    </div>
  );
}

function Profile({ moods, notes }) {
  const { user } = useContext(UserContext);
  const [photoURL, setPhotoUrl] = useState(null);

  const currentUser = auth.currentUser;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storageRef = ref(getStorage(), `users/${user.uid}/profilePhoto`);
        const downloadURL = await getDownloadURL(storageRef);
        if (downloadURL) {
          setPhotoUrl(downloadURL);
        } else {
          setPhotoUrl("https://via.placeholder.com/150");
        }
      } catch (error) {
        console.error(error);
        setPhotoUrl("https://via.placeholder.com/150");
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className=" overflow-hidden h-full shadow-xl max-w-s  bg-blue-600">
      <div className="flex justify-center bg-zinc-300 dark:bg-zinc-900 pb-6">
        <img
          src={photoURL}
          className="rounded-full w-20 h-20 border-solid border-white border-2 mt-8"
        />
      </div>
      <div className="text-center px-3 pb-6 pt-10">
        <h3 className="text-white text-sm bold mt-2 font-sans">
          {user.displayName}
        </h3>
        <p className="mt-1 font-sans font-light text-white">
          Joined on: {currentUser.metadata.creationTime}
        </p>
      </div>
      <div className="flex justify-center pb-3 text-white">
        <div className="text-center mr-3 border-r pr-3">
          <h2>{notes.length}</h2>
          <span>Notes</span>
        </div>
        <div className="text-center">
          <h2>{moods.moods.length}</h2>
          <span>Mood Entries</span>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
