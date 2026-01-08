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
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="mx-auto p-6 rounded-lg bg-gray-100 max-w-[1100px] relative">
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
            <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Profile Card */}
          <div className="md:col-span-4">
            <div className="bg-white shadow-sm rounded-lg text-center h-full">
              <div className="flex flex-col items-center justify-center h-full p-6">
                <div className="w-[90px] h-[90px] rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl mb-3">
                  {formData.fullName?.charAt(0).toUpperCase()}
                </div>

                <h5 className="font-semibold">{formData.fullName}</h5>
                <p className="text-gray-500">{formData.email}</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:col-span-8 space-y-6">
            {/* Update Profile */}
            <div className="bg-white shadow-sm rounded-lg">
              <div className="p-6">
                <h5 className="font-semibold mb-4">Update Profile</h5>

                <form onSubmit={updateProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.fullName}
                        onChange={handleProfileChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.email}
                        onChange={handleProfileChange}
                      />
                    </div>
                  </div>

                  <div className="text-right mt-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-white shadow-sm rounded-lg">
              <div className="p-6">
                <h5 className="font-semibold mb-4">Change Password</h5>

                <form onSubmit={changePassword}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-medium mb-1">
                        Current Password
                      </label>
                      <input
                        type={showCurrent ? "text" : "password"}
                        name="currentPassword"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={passwords.currentPassword}
                        onChange={handlePasswordChange}
                      />
                      <span
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-[38px] cursor-pointer text-gray-600 text-lg select-none"
                      >
                        {showCurrent ? <IoIosEyeOff /> : <IoIosEye />}
                      </span>
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium mb-1">
                        New Password
                      </label>
                      <input
                        type={showNew ? "text" : "password"}
                        name="newPassword"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
                      />
                      <span
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-[38px] cursor-pointer text-gray-600 text-lg select-none"
                      >
                        {showNew ? <IoIosEyeOff /> : <IoIosEye />}
                      </span>
                    </div>
                  </div>

                  <div className="text-right mt-4">
                    <button className="border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition">
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
