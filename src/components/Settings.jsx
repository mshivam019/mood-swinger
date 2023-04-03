import React, { useState, useEffect, useContext } from "react";
import UserContext from "../utils/UserContext";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { updateProfile, updateEmail } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Loading from "../components/Loading";
function Settings() {
  const { user } = useContext(UserContext);
  const currentUser = auth.currentUser;
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [email, setEmail] = useState(user.email || "");
  const { setUser } = useContext(UserContext);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoURL, setPhotoUrl] = useState("https://via.placeholder.com/150");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      const storageRef = ref(
        getStorage(),
        `users/${auth.currentUser.uid}/profilePhoto`
      );
      const downloadURL = await getDownloadURL(storageRef);
      if (downloadURL) setPhotoUrl(downloadURL);
    }
    return () => fetchData();
  }, [photoFile]);
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(currentUser, {
        displayName,
      });
      if (photoFile) {
        const storageRef = ref(
          getStorage(),
          `users/${auth.currentUser.uid}/profilePhoto`
        );
        await uploadBytes(storageRef, photoFile);
        const downloadURL = await getDownloadURL(storageRef);
        await updateProfile(currentUser, {
          photoURL: downloadURL,
        });
      }
      await updateEmail(currentUser, email);
      toast.success("Profile updated successfully");
      setUser(currentUser);
      localStorage.setItem("user", JSON.stringify(currentUser));
      setLoading(false);
    } catch (err) {
      toast.error("Failed to update profile.");
      console.error(err);
    }
  };

  return (
    <div className='h-screen flex-grow overflow-x-hidden overflow-y-none flex flex-wrap content-start px-2">'>
      <div className="container mx-auto max-w-3xl mt-8 p-4 dark:bg-zinc-900 bg-zinc-300 rounded-xl">
        <h1 className="text-2xl font-bold text-zinc-700 dark:text-white px-6 md:px-0">
          Account Settings
        </h1>

        <form
          onSubmit={handleUpdateProfile}
          method="POST"
          encType="multipart/form-data"
        >
          <div className="w-full bg-white dark:bg-black rounded-lg mx-auto mt-8 flex overflow-hidden rounded-b-none">
            <div className="w-1/3 bg-gray-100 dark:bg-zinc-800 p-8 hidden md:inline-block">
              <h2 className="font-medium text-md  dark:text-gray-200 text-gray-700 mb-4 tracking-wide">
                Profile Info
              </h2>
              <p className="text-xs  dark:text-gray-200 text-gray-500">
                Update your basic profile information such as Email Address,
                Name, and Image.
              </p>
            </div>
            <div className="md:w-2/3 w-full">
              <div className="py-8 px-16">
                <label
                  htmlFor="name"
                  className="text-sm dark:text-gray-200 text-gray-600"
                >
                  Name
                </label>
                <input
                  className="mt-2 border-2 border-gray-200 dark:border-zinc-600 dark:bg-zinc-700  px-3 py-2 block w-full rounded-lg text-base dark:text-white text-gray-900 focus:outline-none focus:border-indigo-500"
                  type="text"
                  name="name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <hr className="dark:border-zinc-700 border-gray-200" />
              <div className="py-8 px-16">
                <label
                  htmlFor="email"
                  className="text-sm  dark:text-gray-200 text-gray-600"
                >
                  Email Address
                </label>
                <input
                  className="mt-2 border-2 border-gray-200 dark:border-zinc-600 dark:bg-zinc-700 px-3 py-2 block w-full rounded-lg text-base dark:text-white text-gray-900 focus:outline-none focus:border-indigo-500"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <hr className="dark:border-zinc-700 border-gray-200" />
              <div className="py-8 px-16 clearfix">
                <label
                  htmlFor="photo"
                  className="text-sm dark:text-gray-300 text-gray-600 w-full block"
                >
                  Photo
                </label>
                <img
                  className="rounded-full w-16 h-16 border-2 mb-2 dark:border-zinc-600 border-gray-200 float-left"
                  id="photo"
                  src={photoURL}
                  alt="photo"
                />
                <div className="bg-gray-200 text-gray-500 text-xs mt-5 ml-3 font-bold px-4 py-2 rounded-lg float-left hover:bg-gray-300 hover:text-gray-600 relative overflow-hidden cursor-pointer">
                  <input
                    type="file"
                    name="photo"
                    onChange={(e) => setPhotoFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
                  />{" "}
                  Change Photo
                </div>
              </div>
            </div>
          </div>
          <div className="p-16 py-8 bg-zinc-300 dark:bg-zinc-900 clearfix rounded-b-lg border-t border-gray-200 dark:border-zinc-700 pb-16">
            <p className="float-left text-xs text-gray-500 dark:text-gray-200 tracking-tight mt-2">
              Click on Save to update your Profile Info
            </p>
            {loading ? (
              <div className="lg:w-8/12 w-10/12 float-right">
                {" "}
                <Loading />
              </div>
            ) : (
              <input
                type="submit"
                className="bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer"
                value="Save"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
