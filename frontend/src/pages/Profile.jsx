import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { IoIosEye,IoIosEyeOff  } from "react-icons/io";


const Profile = () => {
  const { user, loadUser } = useContext(AuthContext);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const[loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user.fullName,
    email: user.email,
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleProfileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}users/me`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      setMessage("Profile updated successfully");
      toast.success("Profile updated successfully");
      loadUser(); 
    } catch {
      setLoading(false);
      setError("Failed to update profile");
      toast.error(`${error}, try again!!`);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    setLoading(true);
    if (passwords.newPassword.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}users/me/password`,
        passwords,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLoading(false);
      setMessage("Password changed successfully");
      toast.success("Password changed successfully");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch {
      setLoading(false);
      setError("Password update failed");
      toast.error(error);
    }
  };

  return (
    <div className="container py-5">
      <div
        className="mx-auto p-4 rounded"
        style={{
          maxWidth: "1100px",
          backgroundColor: "#f5f6f8",
        }}
      >
        {loading && (
          <div className="loader-overlay">
            <div className="spinner-border text-primary" />
          </div>
        )}
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm text-center h-100">
              <div className="card-body d-flex flex-column justify-content-center">
                <div
                  className="rounded-circle bg-primary text-white mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{ width: "90px", height: "90px", fontSize: "36px" }}
                >
                  {formData.fullName?.charAt(0).toUpperCase()}
                </div>

                <h5 className="mb-1">{formData.fullName}</h5>
                <p className="text-muted mb-0">{formData.email}</p>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Update Profile</h5>

                <form onSubmit={updateProfile}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        className="form-control"
                        value={formData.fullName}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>

                  <div className="text-end">
                    <button className="btn btn-primary">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>

            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Change Password</h5>

                <form onSubmit={changePassword}>
                  <div className="row">
                    <div className="col-md-6 mb-3 position-relative">
                      <label className="form-label">Current Password</label>
                      <input
                        type={showCurrent ? "text" : "password"}
                        name="currentPassword"
                        className="form-control"
                        value={passwords.currentPassword}
                        onChange={handlePasswordChange}
                      />
                      <span
                        onClick={() => setShowCurrent(!showCurrent)}
                        style={{
                          position: "absolute",
                          top: "67%",
                          right: "20px",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "#555",
                          fontSize: "1.2rem",
                          userSelect: "none",
                        }}
                      >
                        {showCurrent ? <IoIosEyeOff /> : <IoIosEye />}
                      </span>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">New Password</label>
                      <input
                        type={showNew ? "text" : "password"}
                        name="newPassword"
                        className="form-control"
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
                      />
                      <span
                        onClick={() => setShowNew(!showNew)}
                        style={{
                          position: "absolute",
                          top: "53%",
                          right: "24px",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: "#555",
                          fontSize: "1.2rem",
                          userSelect: "none",
                        }}
                      >
                        {showNew ? <IoIosEyeOff /> : <IoIosEye />}
                      </span>
                    </div>
                  </div>

                  <div className="text-end">
                    <button className="btn btn-outline-danger">
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
