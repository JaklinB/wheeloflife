import React, { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from 'react-router-dom';
import "../App.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      // Redirect to Wheel of Life or dashboard after successful login
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };

  return (
    <div className="container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <input ref={emailRef} type="email" placeholder="Email" required />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
