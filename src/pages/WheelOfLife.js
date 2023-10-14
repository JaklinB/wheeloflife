import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import "./WheelOfLife.css";
import { useAuth } from "../contexts/AuthContext";

function WheelOfLife() {
  const { currentUser } = useAuth();

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
    career: [""],
    health: [""],
    personalGrowth: [""],
    relationships: [""],
    appearance: [""],
    hobbies: [""],
  });

  const segments = Object.keys(ratings);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const loadDataFromFirebase = async () => {
      const userCollection = collection(db, "users");
      const q = query(userCollection, where("uid", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setRatings(userData.ratings || ratings);
        setFeedback(userData.feedback || feedback);
      }
    };

    loadDataFromFirebase();
  }, [currentUser]);

  const handleSave = () => {
    if (!currentUser || !selectedSegment) {
      return;
    }

    const userCollection = collection(db, "users");
    const q = query(userCollection, where("uid", "==", currentUser.uid));

    getDocs(q).then((querySnapshot) => {
      if (querySnapshot.empty) {
        addDoc(userCollection, {
          uid: currentUser.uid,
          ratings: {
            ...ratings,
            [selectedSegment]: ratings[selectedSegment],
          },
          feedback: {
            ...feedback,
            [selectedSegment]: feedback[selectedSegment],
          },
        });
      } else {
        const docRef = doc(db, "users", querySnapshot.docs[0].id);
        updateDoc(docRef, {
          ratings: {
            ...ratings,
            [selectedSegment]: ratings[selectedSegment],
          },
          feedback: {
            ...feedback,
            [selectedSegment]: feedback[selectedSegment],
          },
        });
      }
    });
  };

  return (
    <div className="container">
      <div>
        <div className="wheel">
          <svg width="100%" height="100%" viewBox="0 0 200 200">
            {segments.map((segment, index) => (
              <path
                key={segment}
                className={`wheel-segment ${segment} ${
                  selectedSegment === segment ? "selected" : ""
                }`}
                d={`M100,100 L${100 + 100 * Math.cos((index * Math.PI) / 3)},${
                  100 + 100 * Math.sin((index * Math.PI) / 3)
                } A100,100 0 0,1 ${
                  100 + 100 * Math.cos(((index + 1) * Math.PI) / 3)
                },${100 + 100 * Math.sin(((index + 1) * Math.PI) / 3)} Z`}
                onClick={() => setSelectedSegment(segment)}
              />
            ))}
            {segments.map((segment, index) => (
              <text
                key={segment}
                className="segment-text"
                x={100 + 70 * Math.cos(((index + 0.5) * Math.PI) / 3)}
                y={100 + 70 * Math.sin(((index + 0.5) * Math.PI) / 3)}
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
                type="range"
                min="0"
                max="10"
                value={ratings[selectedSegment]}
                onChange={(e) =>
                  setRatings({ ...ratings, [selectedSegment]: e.target.value })
                }
              />
              <span>{ratings[selectedSegment]}</span>
            </label>
            {feedback[selectedSegment] &&
              feedback[selectedSegment].map((improvement, index) => (
                <div key={index}>
                  <label>
                    Improvement {index + 1}:
                    <input
                      type="text"
                      value={improvement}
                      onChange={(e) => {
                        const newFeedback = [...feedback[selectedSegment]];
                        newFeedback[index] = e.target.value;
                        setFeedback({
                          ...feedback,
                          [selectedSegment]: newFeedback,
                        });
                      }}
                    />
                  </label>
                  <button
                    onClick={() => {
                      const newFeedback = [...feedback[selectedSegment]];
                      newFeedback.splice(index, 1);
                      setFeedback({
                        ...feedback,
                        [selectedSegment]: newFeedback,
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button
              onClick={() => {
                const newFeedback = feedback[selectedSegment]
                  ? [...feedback[selectedSegment], ""]
                  : [""];
                setFeedback({ ...feedback, [selectedSegment]: newFeedback });
              }}
            >
              +
            </button>
            <button onClick={handleSave}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WheelOfLife;
