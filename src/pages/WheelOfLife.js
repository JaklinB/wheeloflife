import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import "./WheelOfLife.css";

function WheelOfLife() {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [ratings, setRatings] = useState({
    career: 0,
    health: 0,
    personalGrowth: 0,
    relationships: 0,
    appearance: 0,
    hobbies: 0,
  });
  const [feedback, setFeedback] = useState({
    career: "",
    health: "",
    personalGrowth: "",
    relationships: "",
    appearance: "",
    hobbies: "",
  });

  const handleSegmentClick = (segment) => {
    setSelectedSegment(segment);
  };

  const saveDataToFirebase = async () => {
    const userCollection = collection(db, "users");
    const q = query(userCollection, where("segment", "==", selectedSegment));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      await addDoc(userCollection, {
        segment: selectedSegment,
        rating: ratings[selectedSegment],
        feedback: feedback[selectedSegment],
      });
    }
  };

  useEffect(() => {
    const loadDataFromFirebase = async () => {
      const userCollection = collection(db, "users");
      const querySnapshot = await getDocs(userCollection);
      querySnapshot.forEach((doc) => {
        const segmentData = doc.data();
        setRatings((prev) => ({
          ...prev,
          [segmentData.segment]: segmentData.rating,
        }));
        setFeedback((prev) => ({
          ...prev,
          [segmentData.segment]: segmentData.feedback,
        }));
      });
    };
    loadDataFromFirebase();
  }, []);

  return (
    <div className="container">
      <button className="logout-button">Logout</button>
      <div className="wheel">
        {Object.keys(ratings).map((segment) => (
          <div
            key={segment}
            className={`wheel-segment-wrapper ${
              selectedSegment === segment ? "selected" : ""
            }`}
            onClick={() => handleSegmentClick(segment)}
          >
            <div className={`wheel-segment ${segment}`}></div>
            <h4 className="segment-text" style={{
                left: `""" + str(coordinates[segment][0]) + """vmin`, 
                top: `""" + str(coordinates[segment][1]) + """vmin`}}>{segment}</h4>
          </div>
        ))}
      </div>
      {selectedSegment && (
        <div className="segment-detail">
          <h3>{selectedSegment}</h3>
          <label>
            Rating:
            <input
              type="number"
              value={ratings[selectedSegment]}
              onChange={(e) =>
                setRatings((prev) => ({
                  ...prev,
                  [selectedSegment]: e.target.value,
                }))
              }
            />
          </label>
          <label>
            How to improve:
            <textarea
              value={feedback[selectedSegment]}
              onChange={(e) =>
                setFeedback((prev) => ({
                  ...prev,
                  [selectedSegment]: e.target.value,
                }))
              }
            />
          </label>
          <button onClick={saveDataToFirebase}>Save</button>
        </div>
      )}
    </div>
  );
}

export default WheelOfLife;
