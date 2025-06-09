import { LogOut, Plus, Info } from "lucide-react";
import {Link} from "react-router"
import axios from "axios";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async() => {
    try {
      
  await axios.post(
  
      "http://localhost:5000/api/auth/logout",
      {}, // empty body
      {
        withCredentials: true,
      }
    );
    navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, you can handle the error here, e.g., show a notification
      alert("Logout failed. Please try again.");
    }
  }

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-black shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-1 text-white text-2xl font-extrabold tracking-wide">
        <span className="text-3xl font-black">A</span>
        <span className="-ml-1 text-gray-400">S</span>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 text-gray-300 text-base lg:text-xl font-semibold tracking-wide">
            Customize your daily routine
        </div>

      {/* Right section */}
      <div className="flex items-center gap-6 text-white text-base font-medium">
        {/* About */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-gray-300">
          <Info size={18} />
        </div>

        {/* Add Note */}

        <Link  to="/create" className="bg-green-800 hover:bg-green-700 text-white p-2 rounded-md">
          <Plus size={18} />
        </Link>

        {/* Logout */}
        <button
        onClick={handleLogout}
        className="flex items-center gap-1 hover:text-gray-300">
          <LogOut size={18} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
