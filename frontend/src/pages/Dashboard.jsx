import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FiSettings } from "react-icons/fi";  
import { FaSignOutAlt } from "react-icons/fa"; 


const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

    return (
      <div className="max-w-7xl mx-auto mt-10 px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-xl">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center">
              <h2 className="text-2xl font-semibold mb-3">Dashboard</h2>

              <p className="text-lg mb-2">
                Welcome,{" "}
                <span className="text-blue-600 font-medium">
                  {user.fullName}
                </span>
              </p>

              <p className="text-gray-500 mb-6">
                Role: <strong>{user.role}</strong>
              </p>

              <div className="flex justify-around mt-6">
                <button
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  onClick={goToProfile}
                >
                  <FiSettings /> Settings
                </button>

                <button
                  className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;
