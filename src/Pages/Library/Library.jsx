import React from 'react'
import './Library.css'
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar'
import {FaHistory} from "react-icons/fa"
import WHLVideoList from "../../Components/WHL/WHLVideoList"
import { MdOutlineWatchLater } from 'react-icons/md'
import { AiOutlineLike } from 'react-icons/ai'
import { useSelector } from 'react-redux'
const Library = () => {
  const watchLaterList= useSelector(state=>state.watchLaterReducer)
  const historyList= useSelector(state=>state.HistoryReducer)
  const likedVideoList= useSelector(state=>state.likedVideoReducer)
  const CurrentUser = useSelector((state) => state?.currentUserReducer);
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
    <div className='container-pages-app'>
        <LeftSideBar/>
        <div className="container2-pages-app">
            <div className="container-librarypage">
                <h1 className='title-container-librarypage'>
                  <b>
                    <FaHistory/>
                  </b>
                  <b>History</b>
                </h1>
                <div className="container-videolist-librarypage">
                  <WHLVideoList 
                  page={"History"}
                  CurrentUser={CurrentUser?.result._id}
                  videoList={historyList}
                  />
                </div>
            </div>
            <div className="container-librarypage">
                <h1 className='title-container-librarypage'>
                  <b>
                    <MdOutlineWatchLater/>
                  </b>
                  <b>Watch Later</b>
                </h1>
                <div className="container-videolist-librarypage">
                  <WHLVideoList 
                  page={"Watch Later"}
                  CurrentUser={CurrentUser?.result._id}
                  videoList={watchLaterList}
                  />
                </div>
            </div>
            <div className="container-librarypage">
                <h1 className='title-container-librarypage'>
                  <b>
                    <AiOutlineLike/>
                  </b>
                  <b>Liked Videos</b>
                </h1>
                <div className="container-videolist-librarypage">
                  <WHLVideoList 
                  page={"Liked Videos"}
                  CurrentUser={CurrentUser?.result._id}
                  videoList={likedVideoList}
                  />
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Library
