import React, { useState, useEffect } from "react";
import { db } from "../config/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import "./ImprovementsPage.css";

function ImprovementsPage() {
  const { currentUser } = useAuth();
  const [improvements, setImprovements] = useState({});
  const [newImprovements, setNewImprovements] = useState({});
  const [ratings, setRatings] = useState({});
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const fetchData = async () => {
      const userCollection = collection(db, "users");
      const q = query(userCollection, where("uid", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setRatings(userData.ratings || {});
        setImprovements(userData.feedback || {});
        setSegments(Object.keys(userData.ratings || {}));
      }
    };
    fetchData();
  }, [currentUser]);

  const handleAddImprovement = async (segment) => {
    const updatedImprovements = {
      ...improvements,
      [segment]: [...improvements[segment], newImprovements[segment]],
    };
    setImprovements(updatedImprovements);

    const userCollection = collection(db, "users");
    const q = query(userCollection, where("uid", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = doc(db, "users", querySnapshot.docs[0].id);
      await updateDoc(docRef, { feedback: updatedImprovements });
    }

    setNewImprovements({ ...newImprovements, [segment]: "" });
  };

  const handleDeleteImprovement = async (segment, index) => {
    const updatedImprovements = {
      ...improvements,
      [segment]: improvements[segment].filter((_, i) => i !== index),
    };
    setImprovements(updatedImprovements);

    const userCollection = collection(db, "users");
    const q = query(userCollection, where("uid", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = doc(db, "users", querySnapshot.docs[0].id);
      await updateDoc(docRef, { feedback: updatedImprovements });
    }
  };

  return (
    <div className="improvements-page-background">
      <div className="improvements-container">
        <h2>Goals</h2>
        {Object.keys(improvements).map((segment) => (
          <div key={segment}>
            <h3>{segment}</h3>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${ratings[segment]*10}%` }}
              ></div>
            </div>
            <div className="input-container">
              <input
                value={newImprovements[segment]}
                onChange={(e) =>
                  setNewImprovements({
                    ...newImprovements,
                    [segment]: e.target.value,
                  })
                }
                placeholder={`Add new improvement for ${segment}...`}
              />
              <button
                className="add-button"
                onClick={() => handleAddImprovement(segment)}
              >
                +
              </button>
            </div>
            <ul>
              {improvements[segment].map((improvement, index) => (
                <li key={index}>
                  {improvement}
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteImprovement(segment, index)}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImprovementsPage;
