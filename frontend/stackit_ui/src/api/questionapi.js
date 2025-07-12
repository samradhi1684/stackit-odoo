// src/api/questionapi.js
import { db } from "../utils/firebase";
import { collection, addDoc, getDocs, doc, getDoc } from "firebase/firestore";

export const addQuestion = async (question) => {
    try {
      const docRef = await addDoc(collection(db, "questions"), question);
      console.log("Question added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding question: ", e);
    }
  };



export const fetchAllQuestions = async () => {
  const snapshot = await getDocs(collection(db, "questions"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchQuestionById = async (id) => {
  const docRef = doc(db, "questions", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};
