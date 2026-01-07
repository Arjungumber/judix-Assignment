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
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            {loading && (
            <div className="loader-overlay">
                <div className="spinner-border text-primary" />
            </div>
            )}

            <div className="card p-4 shadow auth-card">
            <h2 className="text-center mb-4">Login</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <input
                    type="email"
                    name="email"
                    className="form-control"
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
                    className="form-control"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                </div>

                <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
                >
                {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <p className="text-center mt-3 mb-0">
                Don’t have an account?{" "}
                <Link className="text-decoration-none signup-link" to="/signup">
                Signup
                </Link>
            </p>
            </div>
        </div>
        );
};

export default Login;
