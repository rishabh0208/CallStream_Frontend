import React from 'react'
import WHL from '../../Components/WHL/WHL';
import {useSelector} from "react-redux";

const LikedVideos = () => {
  const likedVideoList= useSelector(state=>state.likedVideoReducer)
  //console.log(likedVideoList)
  // const likedVideo=[
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
    <WHL page={"LikedVideo"} videoList={likedVideoList}/>
  )
}

export default LikedVideos
