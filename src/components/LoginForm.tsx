import React from "react";
import "../styles/LoginForm.css"; // Import CSS vào
import useLogin from "../hooks/useLogin";
import { useNavigate, Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleLogin: loginHandler,
  } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    await loginHandler(e, () => {
      window.dispatchEvent(new Event("loginSuccess"));
      console.log("Đăng nhập thành công, chuyển hướng về /");
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Please login to your account</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button1">
            Login
          </button>
        </form>
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
