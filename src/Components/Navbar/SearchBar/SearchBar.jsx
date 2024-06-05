import React from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import { BsMicFill } from "react-icons/bs";
import SearchList from "./SearchList";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const [searchList, setsearchList] = useState(false);
  const TitleArray = useSelector((s) => s.VideoReducer)
    ?.data?.filter((q)=>q?.videoTitle.toUpperCase().includes(searchQuery?.toUpperCase())).map((m) => m?.videoTitle)
  // const TitleArray=["Video1","video2","Animation video","Movie"].filter(q=>q.toUpperCase().includes(searchQuery.toUpperCase()));
  return (
    <>
      <div className="SearchBar-container">
        <div className="SearchBar-container2">
          <div className="search-div">
            <input
              type="text"
              className="iBox_SearchBar"
              placeholder="Search"
              onChange={(e) => setsearchQuery(e.target.value)}
              value={searchQuery}
              onClick={(e) => setsearchList(true)}
            />
            <Link to={`/search/${searchQuery}`}>
              <FaSearch
                className="SearchIcon-SearchBar"
                onClick={(e) => setsearchList(false)}
              />
            </Link>
            <BsMicFill className="Mic-SearchBar" />
            {searchQuery && searchList && (
              <SearchList
                setsearchQuery={setsearchQuery}
                TitleArray={TitleArray}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
