import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { LogIn } from "lucide-react";

export default function Login() {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">
          <LogIn className="h-6 w-6" />
        </div>
        <p className="eyebrow">Welcome back</p>
        <h2 className="auth-title">Sign in to EShop</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="auth-label">Email address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="auth-input"
            />
          </div>
          <div>
            <label className="auth-label">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="auth-input"
            />
          </div>
          <button type="submit" className="coral-button auth-submit">
            Sign In
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register" className="auth-link">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
