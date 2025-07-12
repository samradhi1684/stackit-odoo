// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import AskQuestion from "./pages/AskQuestion"; // friend a component
import QuestionDetail from "./pages/QuestionDetail"; //friend b component

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/question/:id" element={<QuestionDetail />} />
      </Routes>
    </>
  );
}

export default App;
