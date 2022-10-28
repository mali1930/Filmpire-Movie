import { useState } from "react";
import { useDispatch } from "react-redux";
import { BiSearchAlt2 } from "react-icons/bi";
import { searchMovie } from "../app/features/currentGenreOrCategory";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const [query, setQuery] = useState(" ");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(searchMovie(query));
      navigate("/");
    }
  };
  return (
    <div className="flex md:block hidden  items-center  ">
      <div className="flex items-center">
        <input
          onKeyPress={handleKeyPress}
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search..."
          className="bg-transparent  border-[1px] border-t-0 border-r-0 border-l-0 hover:bg-none outline-none"
        />
        <BiSearchAlt2 size={25} />
      </div>
    </div>
  );
};

export default Search;
