import React from 'react'
import Home from '../Pages/Home/Home'
import {  Routes, Route } from "react-router-dom";
import Library from '../Pages/Library/Library';
import YourVideo from '../Pages/YourVideo/YourVideo' ;
import WatchHistory from '../Pages/WatchHistory/WatchHistory' ;
import WatchLater from '../Pages/WatchLater/WatchLater' ;
import LikedVideos from '../Pages/LikedVideos/LikedVideos' ;
import VideoPage from '../Pages/VideoPage/VideoPage';
import Channel from '../Pages/Channel/Channel';
import Search from '../Pages/Search/Search';

function AllRoutes  ({ setEditCreateChannelBtn,setVidUploadPage})  {
  return (
    <Routes>
        <Route path='/' element={ <Home/>} />
        <Route path='/library' element={ <Library/>} />
        <Route path='/yourvideos' element={ <YourVideo/>} />
        <Route path='/history' element={ <WatchHistory/>} />
        <Route path='/watchlater' element={ <WatchLater/>} />
        <Route path='/likedvideos' element={ <LikedVideos/>} />
        <Route path='/videopage/:vid' element={ <VideoPage/>} />
        <Route path='/search/:searchQuery' element={ <Search/>} />
        <Route path='/channel/:cid' element={ <Channel 
        setVidUploadPage={setVidUploadPage}
        setEditCreateChannelBtn={ setEditCreateChannelBtn}/>} />

    </Routes>
  )
}

export default AllRoutes
