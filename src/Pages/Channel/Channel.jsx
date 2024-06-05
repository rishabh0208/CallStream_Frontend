import React from 'react'
import ShowVideoGrid from '../../Components/ShowVideoGrid/ShowVideoGrid'
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar'
import DescribeChannel from "./DescribeChannel"
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Channel  ({ setEditCreateChannelBtn,setVidUploadPage})  {
    const {cid}= useParams();
    const vids=useSelector(state=>state.VideoReducer)?.data?.filter(q=>q.videoChannel ===cid).reverse();

    // const vids=[
    //     {
    //       _id:1,
    //       video_src: video,
    //       Chanel:"62bafe6752cea35a6c30685f",
    //       Uploader: "abc",
    //       title:"video 1",
    //       description:"description of video 1",
    //     },
    //     {
    //       _id:2,
    //       video_src:  video2,
    //       Chanel:"cdd",
    //       Uploader: "abc",
    //       title:"video 2",
    //       description:"description of video 2",
    //     },
    //     {
    //       _id:3,
    //       video_src:  video,
    //       Chanel:"add",
    //       Uploader: "abc",
    //       title:"video 3",
    //       description:"description of video 3",
    //     },
    //     {
    //       _id:4,
    //       video_src:  video2,
    //       Chanel:"sdd",
    //       Uploader: "abc",
    //       title:"video 4",
    //       description:"description of video 4",
    //     }
        
    //   ];
    return (
        <div className='container-pages-app'>
            <LeftSideBar/>
            <div className="container2-pages-app">
              <DescribeChannel 
              cid={cid}
              setVidUploadPage={setVidUploadPage}
              setEditCreateChannelBtn = { setEditCreateChannelBtn} />
                <ShowVideoGrid vids={vids} />
            </div>
            
        </div>
      )
}

export default Channel
