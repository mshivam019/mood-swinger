import { auth, db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  orderBy,
  limit,
} from "firebase/firestore";
import Dasher from "../components/Dasher";


function Dashboard() {
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
          toast.error("Please login or Sign up/", {
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
console.log(1)
    getmoods();
  }, []);


  return (
    <div>
      <div className=" bg-white dark:bg-gray-900 min-h-screen">
      {/* <h1 className="text-2xl text-white">Welcome {name}!</h1>
      <h1 className="text-2xl text-white">My Moods</h1>
      <dl className="text-xl text-white block">
        {moods.map((mood) => (
          <div key={mood.id}><dt >{mood.mood}</dt><dd className="ml-4 text-lg">{mood.description}</dd></div>
        ))}
      </dl>
      <button className=" flex items-center text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={storeData}>Store</button>
          
      </div> */}
        <Dasher />
      </div>
    </div>
  );
}

export default Dashboard;
