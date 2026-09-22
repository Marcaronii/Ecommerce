import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { UserPlus } from "lucide-react";

export default function Register() {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();
  const MAX_NAME_LENGTH = 50;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' .-]+$/.test(formData.name.trim())) {
        throw new Error("Full name can only contain letters and spaces");
      }
      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }
      register(formData.name, formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const cleanedValue = value.replace(/\d/g, "").slice(0, MAX_NAME_LENGTH);
      setFormData({ ...formData, [name]: cleanedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (error) setError("");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">
          <UserPlus className="h-6 w-6" />
        </div>
        <p className="eyebrow">Start shopping better</p>
        <h2 className="auth-title">Create your account</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="auth-label">Full name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              maxLength={MAX_NAME_LENGTH}
              className="auth-input"
            />
          </div>
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
            Sign Up
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
}
