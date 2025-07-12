// src/components/QuestionCard.jsx
import { useRole } from "../context/RoleContext";
import { useNavigate } from "react-router-dom";
import { deleteQuestion } from "../api/questionapi";

const QuestionCard = ({ question }) => {
  const { role } = useRole();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/question/${question.id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const confirm = window.confirm("Are you sure you want to delete this question?");
    if (confirm) {
      await deleteQuestion(question.id);
      alert("Question deleted (refresh to see changes).");
    }
  };

  return (
    <div
      className="card my-3 p-3 shadow-sm"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <h5>{question.title}</h5>
      <div
        className="text-muted"
        dangerouslySetInnerHTML={{
          __html: question.description?.slice(0, 100) + "...",
        }}
      />
      <p>
        <strong>Tags:</strong> {question.tags?.join(", ")}
      </p>

      {role !== "guest" && (
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              alert("Answer logic coming soon...");
            }}
          >
            Answer
          </button>
          <button
            className="btn btn-outline-success btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              alert("Upvote logic coming soon...");
            }}
          >
            Upvote
          </button>
        </div>
      )}

      {role === "admin" && (
        <button
          className="btn btn-outline-danger btn-sm mt-2"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default QuestionCard;
