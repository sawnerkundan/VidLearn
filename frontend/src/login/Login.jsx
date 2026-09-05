import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { login } from "../services/auth.service";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    
    /** check if user already logged in */
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            window.location.href = "/dashboard";
        }
    }, []);

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            alert("Please enter email and password");
            return;
        }

        try {
            setLoading(true);

            const loginData = await login(formData.email, formData.password);

            const token = loginData.token;
            const user = loginData.user;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            if (user.role === "admin") {
                window.location.href = "/admin/dashboard";
            } else {
                window.location.href = "/dashboard";
            }
        } catch (error) {
            setError("Invalid email or password");
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <div className="logo">▶</div>

                    <h1>Welcome Back</h1>
                    <p>Sign in to continue learning</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="error-message">
                        {error && <p>{error}</p>}
                    </div>

                    <div className="login-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>

                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="login-footer">
                    <span>Don't have an account?</span>
                    <Link to="/register">Create Account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;