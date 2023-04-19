import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

// what is the sr-only in tailwind

const Searchbar = () => {
  const naviagte = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleOnSubmit = (e) => {
    e.preventDefault();
    naviagte(`/search/${searchTerm}`);
  };
  return (
    <form
      autoComplete="off"
      className="p-2 text-gray-400 focus-within:text-gray-600"
      onSubmit={handleOnSubmit}
    >
      <label htmlFor="search-field" className="sr-only">
        Search all songs
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-5 h-5 ml-4" />
        <input
          autoComplete="off"
          type="search"
          name="search-field"
          placeholder="Search"
          id="search-field"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-5"
        />
      </div>
    </form>
  );
};

export default Searchbar;
