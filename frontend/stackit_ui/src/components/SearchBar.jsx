// src/components/SearchBar.jsx
const SearchBar = ({ searchText, setSearchText, activeTags, setActiveTags, availableTags }) => {
    const toggleTag = (tag) => {
      setActiveTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    };
  
    return (
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Search questions by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="mt-2">
          {availableTags.map((tag) => (
            <span
              key={tag}
              className={`badge rounded-pill mx-1 p-2 ${
                activeTags.includes(tag) ? "bg-primary" : "bg-secondary"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };
  
  export default SearchBar;
  