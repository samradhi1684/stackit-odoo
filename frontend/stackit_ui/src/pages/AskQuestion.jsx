// src/pages/AskQuestion.jsx
import React, { useState, useRef, useEffect } from "react";
import "../styles/AskQuestion.css";
import { addQuestion, fetchAllQuestions } from "../api/questionapi";
import { useRole } from "../context/RoleContext";
import { useNavigate } from "react-router-dom";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [similarSuggestions, setSimilarSuggestions] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const { role } = useRole();
  const navigate = useNavigate();

  // Fetch existing questions
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllQuestions();
      setAllQuestions(data || []);
    };
    fetchData();
  }, []);

  // Format buttons
  const format = (cmd, value = null) => {
    document.execCommand(cmd, false, value);
  };

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      format("insertImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 🔥 AI Suggestion (no backend, uses OpenRouter)
  const fetchSimilarQuestions = async (inputTitle, allTitles) => {
    const prompt = `A user asked: "${inputTitle}". From the following list, show 3 most similar questions:\n${allTitles.join(
      "\n"
    )}`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "No similar questions found.";
    } catch (error) {
      console.error("AI suggestion error:", error);
      return "Could not fetch suggestions.";
    }
  };

  // When title changes
  const handleTitleChange = async (e) => {
    const value = e.target.value;
    setTitle(value);

    if (value.length > 10 && allQuestions.length > 0) {
      const suggestions = await fetchSimilarQuestions(
        value,
        allQuestions.map((q) => q.title)
      );
      setSimilarSuggestions(suggestions);
    } else {
      setSimilarSuggestions("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const description = editorRef.current.innerHTML;

    if (!title || !description) {
      alert("Please fill in all fields");
      return;
    }

    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const newQuestion = {
      title,
      description,
      tags: tagArray,
      createdAt: new Date(),
      author: { name: "Demo User", uid: "123" },
      answers: [],
    };

    await addQuestion(newQuestion);
    alert("Question submitted!");
    navigate("/");
  };

  return (
    <div className="ask-container">
      <h2>Ask a Question</h2>
      {role === "guest" ? (
        <p>Please log in to submit a question.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter your question title"
            value={title}
            onChange={handleTitleChange}
            required
          />

          {/* 🔍 Similar Questions */}
          {similarSuggestions && (
            <div className="similar-box mt-3 mb-3 p-2 bg-light border rounded">
              <strong>🤖 Similar Questions:</strong>
              <pre style={{ whiteSpace: "pre-wrap" }}>{similarSuggestions}</pre>
            </div>
          )}

          <label>Description</label>
          <div className="toolbar">
            <button type="button" onClick={() => format("bold")}><b>B</b></button>
            <button type="button" onClick={() => format("italic")}><i>I</i></button>
            <button type="button" onClick={() => format("strikeThrough")}><s>S</s></button>
            <button type="button" onClick={() => format("insertOrderedList")}>1.</button>
            <button type="button" onClick={() => format("insertUnorderedList")}>•</button>
            <button type="button" onClick={() => format("justifyLeft")}>⬅️</button>
            <button type="button" onClick={() => format("justifyCenter")}>⬅️➡️</button>
            <button type="button" onClick={() => format("justifyRight")}>➡️</button>
            <button
              type="button"
              onClick={() => {
                const url = prompt("Enter URL:");
                if (url) format("createLink", url);
              }}
            >🔗</button>
            <button
              type="button"
              onClick={() => {
                const emoji = prompt("Enter emoji:");
                if (emoji) format("insertText", emoji);
              }}
            >😊</button>
            <button type="button" onClick={() => fileInputRef.current.click()}>🖼️</button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>

          <div
            className="editor"
            contentEditable
            ref={editorRef}
            placeholder="Write your detailed question here..."
          />

          <label>Tags (comma-separated)</label>
          <input
            type="text"
            placeholder="e.g. react, firebase, css"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <button type="submit" className="mt-3">Submit</button>
        </form>
      )}
    </div>
  );
};

export default AskQuestion;
