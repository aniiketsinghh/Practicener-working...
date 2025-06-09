import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

const CreateNote = () => {
  const navigate = useNavigate();

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/notes/create",
        note,
        { withCredentials: true } // 👈 required for cookie-based auth
      );

      console.log("Note created:", res.data);
      navigate("/"); // ✅ go to homepage
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 sm:px-10 py-6">
      {/* 🔙 Back Button */}
      <button onClick={() => navigate("/")} className="flex items-center gap-2 mb-6 text-white hover:text-green-400 transition">
        <ArrowLeft size={22} />
        <span className="text-sm sm:text-base">Back to Notes</span>
      </button>

      {/* Note Box */}
      <form
        onSubmit={handleSubmit}
        className="bg-[#1e293b] p-6 rounded-xl shadow-lg max-w-3xl mx-auto border border-green-600"
      >
        {/* Title */}
        <input
          type="text"
          name="title"
          value={note.title}
          onChange={handleChange}
          placeholder="Enter title..."
          className="w-full mb-4 p-3 rounded-md bg-[#0f172a] border border-gray-600 focus:outline-none focus:border-green-500 text-white text-lg placeholder:text-gray-400"
        />

        {/* Content */}
        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          placeholder="Write your note..."
          rows="10"
          className="w-full mb-6 p-4 rounded-md bg-[#0f172a] border border-gray-600 focus:outline-none focus:border-green-500 text-white text-base placeholder:text-gray-400 resize-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold text-lg transition"
        >
          Save Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
