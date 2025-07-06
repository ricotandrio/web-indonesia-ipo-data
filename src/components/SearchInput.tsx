import { Button } from "@heroui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search by ticker code or underwriter code..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-w-sm"
      />
      <Button
        color="primary"
        onPress={handleSearch}
        isDisabled={!searchQuery.trim()}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchInput;
