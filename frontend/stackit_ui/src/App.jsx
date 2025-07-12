// App.jsx
import { useEffect } from "react";
import { addQuestion } from "./api/questionapi";


function App() {
  useEffect(() => {
    const dummy = {
      title: "How to center a div in CSS?",
      description: "<p>I tried margin auto but it’s not working.</p>",
      tags: ["css", "frontend"],
      createdAt: new Date(),
      author: { name: "Demo User", uid: "123" },
      answers: []
    };
    addQuestion(dummy);
  }, []);

  return (
    <div>
      <h1>Hello StackIt</h1>
    </div>
  );
}

export default App; // <-- This line is required
