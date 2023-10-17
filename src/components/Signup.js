import React, { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "../App.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import CustomAlert from "./CustomAlert";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = React.useState(false);

  const [errorMessage, setErrorMessage] = React.useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailPattern.test(emailRef.current.value)) {
      setErrorMessage("Please enter a valid email address.");
      setShowAlert(true);
      return;
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/segmentInput");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage(
          "The email address is already in use by another account."
        );
        setShowAlert(true);
      } else {
        console.error("Failed to sign up:", error);
        setErrorMessage("Failed to sign up. Please try again.");
        setShowAlert(true);
      }
    }
  };

  return (
    <div className="container">
      {showAlert && (
        <CustomAlert
          message={errorMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input ref={emailRef} type="email" placeholder="Email" required />
        <div className="password-wrapper">
          <input
            ref={passwordRef}
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            required
          />
          <span onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
