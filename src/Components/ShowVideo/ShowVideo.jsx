import React from 'react'
import './ShowVideo.css'
import { Link } from 'react-router-dom'
import moment from "moment"

const ShowVideo = ({vid}) => {
   // console.log(vid)
  return (
    <>
    <Link to={`/videopage/${vid?._id}`}> 

       <video 
       //src={`http://localhost:5500/${vid.filePath}`}
       src={`https://ytbackend-u14j.onrender.com/${vid.filePath}`}  
           className="video-showvideo"
       /> 
    </Link>
    <div className="video-description">
        <div className="Chanel-logo-app">
            <div className="fstChar-logo-app">
                <>
                    {vid?.Uploader?.charAt(0).toUpperCase()}
                </>
            </div>

        </div>
        <div className="video-details">
            <p className='title-vid-showvideo'>{vid?.videoTitle}</p>
            <pre className='vid-view-uploadtime'>{vid?.Uploader}</pre>
            <pre className='vid-view-uploadtime'>
                {vid?.Views} views <div className="dot"></div>{moment(vid?.createdAt).fromNow()}
            </pre>

        </div>
    </div>

      
    </>
  )
}

export default ShowVideo
