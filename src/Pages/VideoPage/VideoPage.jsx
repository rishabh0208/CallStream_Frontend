import React, { useEffect } from 'react'
//import video from '../../Components/Video/video.mp4'
import './VideoPage.css'
import { useDispatch, useSelector } from "react-redux"
import LikeWatchLaterSaveBtns from './LikeWatchLaterSaveBtns'
import Comments from '../../Components/Comments/Comments'
import { Link, useParams } from 'react-router-dom'
import moment from "moment"
import { addToHistory } from '../../actions/History'
import { viewVideo } from '../../actions/video'
import { addpoints } from '../../actions/points'


function VideoPage() {
  const {vid}=useParams();
 //console.log(vid)
 const dispatch= useDispatch();
 const vids= useSelector(state=>state.VideoReducer);
 //console.log(vids)
 const vv= vids?.data.filter(q=> q._id === vid)[0];
 //console.log(vv)
 const CurrentUser = useSelector((state) => state?.currentUserReducer);
 const points=useSelector((state) => state.PointsReducer);
 const handleHistory=()=>{
  dispatch(
   addToHistory(
    {
      videoId: vid,
      Viewer: CurrentUser?.result._id,
    }
   )
  )
 }
 const handleViews=(vw)=>{
  dispatch(viewVideo({
    id:vid
  }))
 }
 useEffect(()=>{
  if(CurrentUser){
    handleHistory();
  }
  handleViews();
  if (CurrentUser?.result._id) {
    dispatch(addpoints(CurrentUser.result._id));
  }
}, [dispatch, CurrentUser, vid]);
  return (
    <>
      <div className="container-videopage">
        <div className="container2-videopage">
            <div className="video-display-screen-videopage">
                <video 
                 src={`http://localhost:5500/${vv?.filePath}`}
                // src={`https://ytbackend-u14j.onrender.com/${vv?.filePath}`} 
                 className={'video-showvideo-videopage'}
               controls
               autoPlay
               ></video>
               <div className="video-details-videopage">
                <div className="video-btns-title-videopage-cont">
                   <p className='video-title-videopage'>
                    {vv?.videoTitle}
                   </p>
                   <div className="views-date-btns-videopage">
                    <div className="views-videopage">
                        {vv?.Views} views <div className="dot"></div> {moment(vv?.createdAt).fromNow()}
                    </div>
                    <LikeWatchLaterSaveBtns vv={vv} vid={vid} />
                   </div>

                </div>
                <Link to={`/channel/${vv?.videoChannel}`} className="channel-details-videopage">
                    <b className='channel-logo-videopage'>
                        <p>{vv?.Uploader.charAt(0).toUpperCase()}</p>
                    </b>
                    <p className='channel-name-videopage'>{vv?.Uploader}</p>
                </Link>
                <div className="comments-videopage">
                    <h2>
                        <u>Comments</u>
                    </h2>
                <Comments 
                videoId={vv._id}
                />
                </div>
               </div>
            </div>
            <div className="moreVideobar">
                More Videos
            </div>
        </div>
      </div>
    </>
  )
}

export default VideoPage
