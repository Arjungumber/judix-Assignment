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
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
            <div className="card shadow p-4 text-center">
                <h2 className="card-title mb-3">Dashboard</h2>
                <p className="h5 mb-2">
                Welcome, <span className="text-primary">{user.fullName}</span>
                </p>
                <p className="text-muted mb-4">
                Role: <strong>{user.role}</strong>
                </p>

                <div className="d-flex justify-content-around mt-4">
                <button
                    className="btn btn-primary d-flex align-items-center"
                    onClick={goToProfile}
                >
                    <FiSettings className="me-2" /> Settings
                </button>

                <button
                    className="btn btn-outline-danger d-flex align-items-center"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt className="me-2" /> Logout
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
