import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      return setError("All fields are required");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);
      await signup({ fullName, email, password });
      toast.success("Signup successful! You can now login.");
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Email might already exist.");
      toast.error("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="container d-flex justify-content-center align-items-center min-vh-100">
  <div className="auth-container p-4 shadow rounded" style={{ maxWidth: '400px', width: '100%' }}>
    <h2 className="text-center mb-4">Signup</h2>

    {error && <p className="text-danger text-center">{error}</p>}

    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Signing up..." : "Signup"}
      </button>
    </form>

    <p className="text-center mt-3">
      Already have an account? 
      <Link to="/login" className="text-decoration-none ms-1 login-link">Login</Link>
    </p>
  </div>
</div>
  )
};

export default Signup;
