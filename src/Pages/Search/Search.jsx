import React from "react";
//import './Search.css'
import LeftSideBar from "../../Components/LeftSideBar/LeftSideBar";
import ShowVideoGrid from "../../Components/ShowVideoGrid/ShowVideoGrid";
//import video from '../../Components/Video/video.mp4'
//import video2 from '../../Components/Video/video2.MP4'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function Search  ()  {
  const {searchQuery} = useParams();
  console.log(searchQuery);
    const vids = useSelector((state) => state.VideoReducer)
    ?.data?.filter((q) =>
      q?.videoTitle.toUpperCase().includes(searchQuery.toUpperCase())).reverse();
    
  //console.log(videosFile);
  // const vids=[
  //   {
  //     _id:1,
  //     video_src: video,
  //     Chanel:"62bafe6752cea35a6c30685f",
  //     Uploader: "abc",
  //     title:"video 1",
  //     description:"description of video 1",
  //   },
  //   {
  //     _id:2,
  //     video_src:  video2,
  //     Chanel:"cdd",
  //     Uploader: "abc",
  //     title:"video 2",
  //     description:"description of video 2",
  //   },
  //   {
  //     _id:3,
  //     video_src:  video,
  //     Chanel:"add",
  //     Uploader: "abc",
  //     title:"video 3",
  //     description:"description of video 3",
  //   },
  //   {
  //     _id:4,
  //     video_src:  video2,
  //     Chanel:"sdd",
  //     Uploader: "abc",
  //     title:"video 4",
  //     description:"description of video 4",
  //   }

  // ];

  return (
    <div className="container-pages-app">
      <LeftSideBar />
      <div className="container2-pages-app">
        <ShowVideoGrid vids={vids} />
      </div>
    </div>
  );
};

export default Search;
