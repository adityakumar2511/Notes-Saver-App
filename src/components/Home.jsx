import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);
  const loggedInUser = useSelector((state) => state.paste.user);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);

      if (
        paste &&
        paste.userEmail === loggedInUser?.email &&
        paste.userPassword === loggedInUser?.password
      ) {
        setTitle(paste.title);
        setValue(paste.content);
        setUnauthorized(false);
      } else {
        setUnauthorized(true);
        setTitle("");
        setValue("");
      }
    } else {
      setUnauthorized(false);
    }
  }, [pasteId, allPastes, loggedInUser]);

  function createPaste() {
    if (!loggedInUser) {
      alert("You must be logged in to create a paste.");
      return;
    }

    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
      userEmail: loggedInUser.email,
      userPassword: loggedInUser.password,
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setValue("");
    setTitle("");
    setSearchParams({});
  }

  if (!loggedInUser) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        Please log in to create or edit notes.
      </div>
    );
  }

  if (pasteId && unauthorized) {
    return (
      <div className="text-center text-red-500 text-xl mt-10">
        You are not authorized to view this note.
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 xl:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 mb-6 text-center">
          {pasteId ? "Edit Your Notes" : "Create a New Note"}
        </h1>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
            Title
          </label>
          <input
            type="text"
            className="w-full p-2 sm:p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700 text-sm sm:text-base"
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700 text-sm sm:text-base">
            Content
          </label>
          <textarea
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700 text-sm sm:text-base"
            value={value}
            placeholder="Enter content here"
            onChange={(e) => setValue(e.target.value)}
            rows={10}
          />
        </div>

        <div className="flex justify-center sm:justify-end">
          <button
            onClick={createPaste}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-xl hover:bg-blue-700 transition font-medium text-sm sm:text-base"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
