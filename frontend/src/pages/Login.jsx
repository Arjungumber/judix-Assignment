import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.email || !formData.password) {
        return setError("All fields are required");
        }

        try {
        setLoading(true);
        const loggedInUser = await login(formData);
        toast.success("login successfully");
            if (loggedInUser.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
        setError("Invalid email or password");
        toast.error(err.message);
        } finally {
        setLoading(false);
        }
    };

    return (
      <div className="flex justify-center items-center min-h-screen relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-b-4 border-gray-200"></div>
          </div>
        )}

        <div className="p-4 shadow rounded-lg w-full max-w-md bg-white">
          <h2 className="text-center mb-4 text-2xl font-semibold">Login</h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Don’t have an account?{" "}
            <Link className="text-blue-600 hover:underline" to="/signup">
              Signup
            </Link>
          </p>
        </div>
      </div>
    );
};

export default Login;
