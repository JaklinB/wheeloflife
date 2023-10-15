import React, { useState } from "react";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  updateDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import "./SegmentInput.css";

function SegmentInput() {
  const { currentUser } = useAuth();
  const [segments, setSegments] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSave = async () => {
    if (!currentUser) return;

    const filteredSegments = segments
      .filter((segment) => segment.trim() !== "")
      .map((segment) => segment.trim().slice(0, 20));

    if (filteredSegments.length === 0) {
      setAlertMessage("Please enter valid segments.");
      setShowAlert(true);
      return;
    }

    const userCollection = collection(db, "users");
    const q = query(userCollection, where("uid", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      addDoc(userCollection, {
        uid: currentUser.uid,
        segments: filteredSegments,
        ratings: filteredSegments.reduce((acc, segment) => {
          acc[segment] = "";
          return acc;
        }, {}),
      });
    } else {
      const userDoc = doc(db, "users", querySnapshot.docs[0].id);
      await updateDoc(userDoc, {
        segments: filteredSegments,
        ratings: filteredSegments.reduce((acc, segment) => {
          acc[segment] = "";
          return acc;
        }, {}),
      });
    }

    navigate("/wheeloflife");
  };

  const handleSegmentChange = (index, value) => {
    const newSegments = [...segments];
    newSegments[index] = value;
    setSegments(newSegments);

    if (value.length > 20) {
      setAlertMessage("Segment should not exceed 20 characters.");
      setShowAlert(true);
    }
  };

  return (
    <div className="segment-input-container">
      <h2>Input Your Life Segments</h2>
      {segments.map((segment, index) => (
        <input
          key={index}
          value={segment}
          placeholder={`Segment ${index + 1}`}
          onChange={(e) => handleSegmentChange(index, e.target.value)}
        />
      ))}
      <button className="save-new-segment-button" onClick={handleSave}>
        Save Segments
      </button>
      <p>
        Want to learn more about the Wheel of Life? Check out the{" "}
        <Link to="about">About</Link> page.
      </p>
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

export default SegmentInput;
