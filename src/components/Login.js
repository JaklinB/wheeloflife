import React, { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "../App.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/wheeloflife");
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/invalid-login-credentials"
      ) {
        setAlertMessage("Incorrect email or password.");
        setShowAlert(true); 
      } else {
        console.error("Failed to log in:", error);
      }
    }
  };

  return (
    <div className="container">
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
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
