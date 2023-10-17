import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "../App.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import CustomAlert from "./CustomAlert";
import Modal from "./Modal";
import { sendPasswordResetEmail } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState("");
  const [resetMessage, setResetMessage] = React.useState("");

  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Password reset email sent!");
    } catch (error) {
      setResetMessage("Error sending password reset email.");
      console.error("Error sending password reset email:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );

      if (userCredential && userCredential.user) {
        const uid = userCredential.user.uid;
        const userCollection = collection(db, "users");
        const q = query(userCollection, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();

          if (
            !userData ||
            !userData.segments ||
            userData.segments.length === 0
          ) {
            navigate("/segmentInput");
            return;
          }
        } else {
          navigate("/segmentInput");
          return;
        }

        navigate("/wheeloflife");
      }
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
        <p
          id="forgot-pass-p"
          onClick={() => setIsModalOpen(true)}
          style={{ cursor: "pointer" }}
        >
          Forgot Password?
        </p>
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Reset Password</h2>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit">Send Reset Email</button>
        </form>
        {resetMessage && <p>{resetMessage}</p>}
      </Modal>
    </div>
  );
}

export default Login;
