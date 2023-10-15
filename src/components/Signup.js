import React, { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "../App.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import CustomAlert from "./CustomAlert";
import { useNavigate } from "react-router-dom";

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/segmentInput");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setShowAlert(true);
      } else {
        console.error("Failed to sign up:", error);
      }
    }
  };

  return (
    <div className="container">
      {showAlert && (
        <CustomAlert
          message="The email address is already in use by another account."
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
        <button type="submit">Sign Up</button>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
