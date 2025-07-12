import { useEffect, useState } from "react";
import { fetchAllQuestions } from "../api/questionapi";
import QuestionCard from "../components/QuestionCard";
import { useRole } from "../context/RoleContext";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const { role } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAllQuestions();
      setQuestions(data);
    };
    fetchData();
  }, []);

  const availableTags = Array.from(new Set(questions.flatMap((q) => q.tags || [])));

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(searchText.toLowerCase()) &&
    (activeTags.length === 0 || activeTags.some((tag) => q.tags.includes(tag)))
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2>All Questions</h2>
        <span className="badge bg-secondary text-uppercase">{role}</span>
      </div>

      {(role === "user" || role === "admin") && (
        <div className="mb-3 text-end">
          <button className="btn btn-success" onClick={() => navigate("/ask")}>
            + Ask a Question
          </button>
        </div>
      )}

      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        activeTags={activeTags}
        setActiveTags={setActiveTags}
        availableTags={availableTags}
      />

      {filteredQuestions.length > 0 ? (
        filteredQuestions.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))
      ) : (
        <p className="text-muted">No matching questions found.</p>
      )}
    </div>
  );
};

export default Home;

