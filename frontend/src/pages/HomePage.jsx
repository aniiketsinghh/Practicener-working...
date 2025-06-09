import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notes", {
          withCredentials: true, // ✅ Correct way in Axios
        });

        setNotes(response.data); // ✅ Axios does not need .ok check
        console.log("Notes fetched successfully:", response.data);

      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-10 px-4 sm:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">
        Your Notes
      </h1>

      {notes.length === 0 ? (
        <div className="text-center text-green-400 text-xl mt-10">
          You don't have any notes yet. <br />
          <span className="text-green-300 underline">Create one</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note, index) => (
            <div
              key={index}
              className="bg-[#1e293b] border border-green-500 rounded-xl p-5 shadow-md hover:scale-105 transition-transform cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-green-400 mb-2">
                {note.title}
              </h2>
              <span className="text-gray-300">{note.content}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
