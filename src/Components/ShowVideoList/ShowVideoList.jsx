import React from 'react'
import './ShowVideoList.css'
import ShowVideo from '../ShowVideo/ShowVideo'
import { useSelector } from 'react-redux'

const ShowVideoList = ({videoId}) => {
  const vids= useSelector(s=>s.VideoReducer)
  //console.log(vids.data)
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
    <div className='container-showvideogrid'>
      {
        vids?.data?.filter(q=>q._id === videoId).map(vi=>{
            return (
                <div key={vi._id} className="video-box">
                   <ShowVideo vid={vi} />
                </div>
            )
        })
      }
    </div>
  )
}

export default ShowVideoList
