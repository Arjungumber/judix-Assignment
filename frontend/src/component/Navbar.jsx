import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiUsers } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null; 

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between w-full py-2">
          {/* Left section */}
          <div className="flex items-center gap-2 font-semibold text-gray-800">
            <FiUsers size={22} />
            <span>User Management</span>
          </div>

          <button
            className="lg:hidden p-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-600 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-600"></span>
          </button>

          <div className="hidden lg:flex justify-end" id="navbarNav">
            <ul className="flex items-center gap-6">
              <li>
                <Link
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                  to="/tasks"
                >
                  Tasks
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                  to="/"
                >
                  Dashboard
                </Link>
              </li>

              {user.role === "admin" && (
                <li>
                  <Link
                    className="text-gray-700 hover:text-blue-600 font-medium transition"
                    to="/admin"
                  >
                    Admin
                  </Link>
                </li>
              )}

              <li>
                <Link
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                  to="/profile"
                >
                  {user.fullName.charAt(0).toUpperCase() +
                    user.fullName.slice(1)}{" "}
                  ({user.role})
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="border border-red-500 text-red-500 px-4 py-1.5 rounded-md hover:bg-red-500 hover:text-white transition"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
