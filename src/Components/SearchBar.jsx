// SearchBar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault(); // prevent page reload
        if (!searchTerm.trim()) return; // ignore empty search
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <form className="search flex items-center" role="search" onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search products, brands, vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search products"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l"
            />
            <button
                type="submit"
                aria-label="Submit search"
                className="px-3 py-2 text-skyblue rounded-r"
            >
                <Search size={20} strokeWidth={2} />
            </button>

        </form>

    );
};

export default SearchBar;
