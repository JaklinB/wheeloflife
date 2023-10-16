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
import CustomAlert from "../components/CustomAlert";

function WheelOfLife() {
  const { currentUser } = useAuth();

  const [selectedSegment, setSelectedSegment] = useState(null);
  const [ratings, setRatings] = useState({});
  const [feedback, setFeedback] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const segments = Object.keys(ratings);

  useEffect(() => {
    if (!currentUser) return;
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
    if (!currentUser || !selectedSegment) return;

    if (
      feedback[selectedSegment] &&
      feedback[selectedSegment][feedback[selectedSegment].length - 1] === ""
    ) {
      setShowAlert(true);
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
      <div className="wheel">
        <svg viewBox="0 0 200 200">
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
              style={{ fill: `var(--color-${index + 1})` }}
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
        <div className="glass-card">
          <h3
            style={{
              color: `var(--color-${segments.indexOf(selectedSegment) + 1})`,
            }}
          >
            {selectedSegment}
          </h3>
          <span
            style={{
              color: `var(--color-${segments.indexOf(selectedSegment) + 1})`,
            }}
          >
            {" "}
            Rating:{ratings[selectedSegment]}
          </span>
          <input
            className="range-slider"
            type="range"
            min="0"
            max="10"
            style={{
              backgroundColor: `var(--color-${
                segments.indexOf(selectedSegment) + 1
              })`,
            }}
            value={ratings[selectedSegment]}
            onChange={(e) =>
              setRatings({ ...ratings, [selectedSegment]: e.target.value })
            }
          />
          {feedback[selectedSegment] &&
            feedback[selectedSegment].map((improvement, index) => (
              <div key={index} className="input-group">
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
                <button
                  className={selectedSegment}
                  id="selected-segment"
                  style={{
                    backgroundColor: `var(--color-${
                      segments.indexOf(selectedSegment) + 1
                    })`,
                  }}
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
            className={selectedSegment}
            id="selected-segment"
            style={{
              backgroundColor: `var(--color-${
                segments.indexOf(selectedSegment) + 1
              })`,
            }}
            onClick={() => {
              if (
                !feedback[selectedSegment] ||
                feedback[selectedSegment][
                  feedback[selectedSegment].length - 1
                ] !== ""
              ) {
                const newFeedback = feedback[selectedSegment]
                  ? [...feedback[selectedSegment], ""]
                  : [""];
                setFeedback({ ...feedback, [selectedSegment]: newFeedback });
              }
            }}
          >
            Add Improvement
          </button>
          <button
            className={selectedSegment}
            id="selected-segment"
            style={{
              backgroundColor: `var(--color-${
                segments.indexOf(selectedSegment) + 1
              })`,
            }}
            onClick={() => {
              setRatings({ ...ratings, [selectedSegment]: null });
              handleSave();
              setSelectedSegment(null);
            }}
          >
            Save
          </button>
        </div>
      )}
      {showAlert && (
        <CustomAlert
          message="Improvement value cannot be empty."
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

export default WheelOfLife;
