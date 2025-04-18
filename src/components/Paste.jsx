import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const loggedInUser = useSelector((state) => state.paste.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  if (!loggedInUser) {
    toast.error("Please login to view your pastes.");
    navigate("/login");
    return null;
  }

  const userPastes = pastes.filter(
    (paste) =>
      paste.userEmail === loggedInUser.email &&
      paste.userPassword === loggedInUser.password
  );

  const filteredData = userPastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  async function handleShare(paste) {
    if (navigator.share) {
      try {
        await navigator.share({
          title: paste.title,
          text: paste.content,
          url: window.location.href,
        });
        toast.success("Shared successfully!");
      } catch (error) {
        toast.error("Failed to share!");
      }
    } else {
      toast.error("Sharing is not supported on this device.");
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <input
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-gray-700"
        type="text"
        placeholder="Search your notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-6 mt-6">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste?._id}
              className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 hover:shadow-md transition"
            >
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">
                {paste.title}
              </h2>
              <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                {paste.content}
              </p>

              <div className="flex flex-wrap gap-3 justify-between items-center text-sm">
                <div className="flex gap-2 flex-wrap">
                  <a
                    href={`/?pasteId=${paste?._id}`}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded-xl hover:bg-blue-700 transition"
                  >
                    Edit
                  </a>
                  <a
                    href={`./pastes/${paste?._id}`}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded-xl hover:bg-blue-700 transition"
                  >
                    View
                  </a>
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded-xl hover:bg-blue-700 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Copied to clipboard!");
                    }}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded-xl hover:bg-blue-700 transition"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleShare(paste)}
                    className="bg-blue-600 text-white px-4 py-1.5 rounded-xl hover:bg-blue-700 transition"
                  >
                    Share
                  </button>
                </div>
                <span className="text-gray-400 text-xs">
                  {new Date(paste.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 text-2xl font-medium mt-10">
            No notes found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;
