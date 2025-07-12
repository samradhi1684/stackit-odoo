import { useRole } from "../context/RoleContext";
import { useNavigate } from "react-router-dom";

const QuestionCard = ({ question }) => {
  const { role } = useRole();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/question/${question.id}`);
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
        <div>
          <button
            className="btn btn-outline-primary btn-sm me-2"
            onClick={(e) => {
              e.stopPropagation(); // prevent navigating to detail page
              alert("Answer logic coming soon...");
            }}
          >
            Answer
          </button>
          <button
            className="btn btn-outline-success btn-sm"
            onClick={(e) => {
              e.stopPropagation(); // prevent navigating to detail page
              alert("Upvote logic coming soon...");
            }}
          >
            Upvote
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
