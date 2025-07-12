// src/pages/QuestionDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchQuestionById, fetchAnswers, postAnswer } from "../api/questionapi";
import { useRole } from "../context/RoleContext";
import AnswerCard from "../components/AnswerCard";
import TextEditor from "../components/TextEditor";

export default function QuestionDetail() {
  const { id } = useParams();
  const { role } = useRole();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [votes, setVotes] = useState({ up: 0, down: 0 });

  useEffect(() => {
    const loadData = async () => {
      const q = await fetchQuestionById(id);
      const a = await fetchAnswers(id);
      setQuestion(q);
      setAnswers(a);
    };
    loadData();
  }, [id]);

  const handleSubmit = async () => {
    if (!newAnswer) return;
    const answer = {
      text: newAnswer,
      createdAt: new Date(),
      author: role,
    };
    await postAnswer(id, answer);
    const updated = await fetchAnswers(id);
    setAnswers(updated);
    setNewAnswer("");
  };

  const handleVote = (type) => {
    setVotes((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };

  if (!question) return <div className="container mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>{question.title}</h2>

      <div className="d-flex align-items-center gap-3 my-2">
        <button className="btn btn-success" onClick={() => handleVote("up")}>⬆️ Upvote</button>
        <span>{votes.up}</span>
        <button className="btn btn-danger" onClick={() => handleVote("down")}>⬇️ Downvote</button>
        <span>{votes.down}</span>
      </div>

      <div className="mb-3">
        {question.tags?.map((tag, i) => (
          <span key={i} className="badge bg-info me-2">{tag}</span>
        ))}
      </div>

      <div
        className="mb-4"
        dangerouslySetInnerHTML={{ __html: question.description }}
      />

      <h4>Answers</h4>
      {answers.length === 0 && <p>No answers yet.</p>}
      {answers.map((a, i) => (
        <AnswerCard key={i} data={a} />
      ))}

      {role !== "guest" && (
        <>
          <h5 className="mt-4">Submit Your Answer</h5>
          <TextEditor value={newAnswer} onChange={setNewAnswer} />
          <button className="btn btn-primary mt-2" onClick={handleSubmit}>
            Post Answer
          </button>
        </>
      )}
    </div>
  );
}
