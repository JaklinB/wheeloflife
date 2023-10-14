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

  const segments = Object.keys(ratings);

  return (
    <div className="container">
      <button className="logout-button">Logout</button>
      <div className="wheel">
        <svg width="100%" height="100%" viewBox="0 0 200 200">
          {segments.map((segment, index) => (
            <path
              key={segment}
              className={`wheel-segment ${segment} ${selectedSegment === segment ? "selected" : ""}`}
              d={`M100,100 L${100 + 100 * Math.cos(index * Math.PI / 3)},${100 + 100 * Math.sin(index * Math.PI / 3)} A100,100 0 0,1 ${100 + 100 * Math.cos((index + 1) * Math.PI / 3)},${100 + 100 * Math.sin((index + 1) * Math.PI / 3)} Z`}
              onClick={() => setSelectedSegment(segment)}
            />
          ))}
          {segments.map((segment, index) => (
            <text
              key={segment}
              className="segment-text"
              x={100 + 70 * Math.cos((index + 0.5) * Math.PI / 3)}
              y={100 + 70 * Math.sin((index + 0.5) * Math.PI / 3)}
            >
              {segment}
            </text>
          ))}
        </svg>
      </div>
      {selectedSegment && (
        <div className="segment-detail">
          <h3>{selectedSegment}</h3>
          <label>
            Rating:
            <input
              type="number"
              value={ratings[selectedSegment]}
              onChange={(e) => setRatings({...ratings, [selectedSegment]: e.target.value})}
            />
          </label>
          <label>
            How to improve:
            <textarea
              value={feedback[selectedSegment]}
              onChange={(e) => setFeedback({...feedback, [selectedSegment]: e.target.value})}
            />
          </label>
          <button onClick={() => {
              const userCollection = collection(db, "users");
              const q = query(userCollection, where("segment", "==", selectedSegment));
              getDocs(q).then(querySnapshot => {
                if (querySnapshot.empty) {
                  addDoc(userCollection, {
                    segment: selectedSegment,
                    rating: ratings[selectedSegment],
                    feedback: feedback[selectedSegment],
                  });
                }
              });
          }}>Save</button>
        </div>
      )}
    </div>
  );
}

export default WheelOfLife;
