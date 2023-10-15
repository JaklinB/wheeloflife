import React, { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, query, where, updateDoc, getDocs, doc } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function SegmentInput() {
    const { currentUser } = useAuth();
    const [segments, setSegments] = useState(["", "", "", "", "", ""]);
    const navigate = useNavigate();

    const handleSave = async () => {
        if (!currentUser) return;
        
        const userCollection = collection(db, "users");
        const q = query(userCollection, where("uid", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            addDoc(userCollection, {
                uid: currentUser.uid,
                segments: segments,
                ratings: segments.reduce((acc, segment) => {
                    acc[segment] = "";
                    return acc;
                }, {})
            });
        } else {
            const userDoc = doc(db, "users", querySnapshot.docs[0].id);
            await updateDoc(userDoc, {
                segments: segments,
                ratings: segments.reduce((acc, segment) => {
                    acc[segment] = "";
                    return acc;
                }, {})
            });
        }

        navigate("/wheeloflife");
    };

    return (
        <div className="segment-input-container">
            <h2>Input Your Life Segments</h2>
            {segments.map((segment, index) => (
                <input
                    key={index}
                    value={segment}
                    placeholder={`Segment ${index + 1}`}
                    onChange={e => {
                        const newSegments = [...segments];
                        newSegments[index] = e.target.value;
                        setSegments(newSegments);
                    }}
                />
            ))}
            <button onClick={handleSave}>Save Segments</button>
        </div>
    );
}

export default SegmentInput;
