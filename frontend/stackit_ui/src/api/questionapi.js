// src/api/questionapi.js
// src/api/questionapi.js
import { db } from "../utils/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

// Add a new question
export const addQuestion = async (question) => {
  try {
    const docRef = await addDoc(collection(db, "questions"), question);
    console.log("Question added with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding question:", e);
  }
};

// Fetch all questions
export const fetchAllQuestions = async () => {
  const snapshot = await getDocs(collection(db, "questions"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Fetch a specific question by ID
export const fetchQuestionById = async (id) => {
  const docRef = doc(db, "questions", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// Fetch all answers for a specific question
export const fetchAnswers = async (questionId) => {
  const answersRef = collection(db, "questions", questionId, "answers");
  const snapshot = await getDocs(answersRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Post a new answer to a question
export const postAnswer = async (questionId, answer) => {
  const answersRef = collection(db, "questions", questionId, "answers");
  const docRef = await addDoc(answersRef, answer);
  return docRef.id;
};

// Delete a question (Admin only)
export const deleteQuestion = async (id) => {
  try {
    await deleteDoc(doc(db, "questions", id));
    console.log("Question deleted:", id);
  } catch (e) {
    console.error("Error deleting question:", e);
  }
};
