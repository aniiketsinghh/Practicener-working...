import { Plus } from "lucide-react";

const NoNotes = ({ onCreate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4">
      
      {/* Gradient Heading Text - No underline */}
      <h2
        className="text-4xl sm:text-5xl lg:text-6xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-400 to-emerald-500 no-underline"
        style={{ maxWidth: "35ch", fontFamily: "'Poppins', sans-serif" }}
      >
        No notes?
      </h2>

      {/* Soft Prompt - No underline */}
      <p className="text-green-300 text-base sm:text-lg md:text-xl font-medium mb-10 italic no-underline">
        Create your first one!
      </p>

      {/* Plus Icon Button with WHITE border now */}
      <button
        onClick={onCreate}
        className="border-2 border-white rounded-xl p-5 hover:bg-green-800 hover:scale-105 transition duration-300 shadow-lg group"
      >
        <Plus className="text-green-300 w-9 h-9 group-hover:rotate-90 transition duration-300" />
      </button>
    </div>
  );
};

export default NoNotes;
