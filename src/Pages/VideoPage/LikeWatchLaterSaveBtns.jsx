import React, { useEffect, useState } from 'react'
import {BsThreeDots} from 'react-icons/bs'
import './LikeWatchLaterSaveBtns.css'
import { MdPlaylistAddCheck } from 'react-icons/md'
import {  RiHeartAddFill, RiPlayListAddFill, RiShareForwardLine } from 'react-icons/ri'
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { likeVideo } from '../../actions/video'
import { addTolikedVideo, deletelikedVideo } from '../../actions/likedVideo'
import { addTowatchLater, deleteWatchLater } from '../../actions/watchLater'

function LikeWatchLaterSaveBtns ({vv,vid}) {
    const CurrentUser = useSelector((state) => state?.currentUserReducer);
    const dispatch= useDispatch();
    const [SaveVideo, setSaveVideo]=useState(false);
    const [DisLikebtn, setDisLikebtn]=useState(false);
    const [Likebtn, setLikebtn]= useState(false);
    const likedVideoList= useSelector(state=>state.likedVideoReducer)
    const watchLaterList= useSelector(state=>state.watchLaterReducer) 
    useEffect(()=>{
        likedVideoList?.data.filter(q=>q?.videoId ===vid  && q?.Viewer===CurrentUser?.result._id ).map(m=>setLikebtn(true))
    },[])

    useEffect(()=>{
        watchLaterList?.data.filter(q=>q?.videoId ===vid  && q?.Viewer===CurrentUser?.result._id ).map(m=>setSaveVideo(true))
    },[])

    const toggleSavedVideo=()=>{
        if(CurrentUser){
            if(SaveVideo){
            setSaveVideo(false);
            dispatch(deleteWatchLater({
                videoId: vid,
                Viewer: CurrentUser?.result._id,
            }))
        }else{
            setSaveVideo(true);
            dispatch(addTowatchLater({
                videoId: vid,
                Viewer: CurrentUser?.result._id,
            }));
        }
        }
        else{
          alert("Plz Login to save the video!")  
        }
        
    }

    const toggleLikebtn=(e,lk)=>{
        if(CurrentUser){
            if(Likebtn){
            setLikebtn(false);
            dispatch(
                likeVideo({
                id: vid,
                Like: lk-1,
            })) ;
            dispatch(deletelikedVideo({
                videoId: vid,
                Viewer: CurrentUser?.result._id,
            }));
        }else{
            setLikebtn(true);
            dispatch(likeVideo({
                id: vid,
                Like: lk+1,
            })); 
            dispatch(
                addTolikedVideo({
                videoId: vid,
                Viewer: CurrentUser?.result._id,
            }))
            setDisLikebtn(false);
        }
        }
        else{
            alert("Plz Login to give a like")
        }
        
    }

    const toggleDisLikebtn=(e,lk)=>{
        if(CurrentUser){
            if(DisLikebtn){
            setDisLikebtn(false);
        }else{
            setDisLikebtn(true);
            if(Likebtn){
                dispatch(likeVideo({
                    id: vid,
                    Like: lk-1,
                })) 
                dispatch(deletelikedVideo({
                    videoId: vid,
                    Viewer: CurrentUser?.result._id,
                }));
            }
            setLikebtn(false);
        }
        }
        else {
            alert("Login to Dislike")
        }
        
    }

  return (
    <div className="btns-cont-videopage">
        <div className="btn-videopage">
            <BsThreeDots/>
        </div>
        <div className="btn-videopage">
        <div className="like-videopage" onClick={(e)=>toggleLikebtn(e,vv.Like)}>
                {
                    Likebtn ? ( 
                    <>
                <AiFillLike size={22} className='btns-videopage'  />
                    </>
                    ) : ( 
                    <>
                <AiOutlineLike size={22} className='btns-videopage'/>
                    </>
               ) }
               <b>{vv.Like}</b>
                
            </div>
            <div className="like-videopage" onClick={(e)=>toggleDisLikebtn(e,vv.Like)}>
                {
                    DisLikebtn ? ( 
                    <>
                <AiFillDislike size={22} className='btns-videopage'  />
                    </>
                    ) : ( 
                    <>
                <AiOutlineDislike size={22} className='btns-videopage'/>
                    </>
               ) }
               <b>DisLike</b>
                
            </div>
            
            <div className="like-videopage" onClick={()=>toggleSavedVideo()}>
                    {
                        SaveVideo ? (
                           <>
                                <MdPlaylistAddCheck size={22} className='btns-videopage' />
                                <b> Saved</b>
                            </>
                        ) : (
                             <>
                                <RiPlayListAddFill size={22} className='btns-videopage' />
                                <b>Save</b>
                            </>
                        )
                    }
                </div>
            <div className="like-videopage" >
                    <>
                <RiHeartAddFill size={22} className='btns-videopage'  />
                     <b>Thanks</b>
                    </>
            </div>
            <div className="like-videopage">
                    <>
                <RiShareForwardLine size={22} className='btns-videopage'  />
                     <b>Share</b>
                    </>
            </div>

        </div>
    </div>
  )
}

export default LikeWatchLaterSaveBtns
