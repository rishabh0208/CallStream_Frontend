import React, { useState } from 'react'
import './Comments.css'
import DisplayComments from './DisplayComments'
import { useDispatch, useSelector } from 'react-redux';
import { postComment } from '../../actions/comments';

function Comments ({videoId}) {
    const [commenttext,setcommentText]=useState("")
    const CurrentUser = useSelector((state) => state?.currentUserReducer);
     const commentList= useSelector(s=>s.commentReducer)
    // const commentList=[
    //    { 
    //     _id:"1",
    //     commentBody:"hello",
    //     userCommented:"abc",
    // },
    // { 
    //     _id:"2",
    //     commentBody:"hii",
    //     userCommented:"xyz",
    // }
    // ]
    const dispatch= useDispatch();
    const handleOnSubmit=(e)=>{
        e.preventDefault();

        if(CurrentUser){
             if(!commenttext){
            alert("Plz Type Your Comment!");
        }
        else {
          dispatch(postComment({
            videoId:videoId,
            userId:CurrentUser?.result._id,
            commentBody:commenttext,
            userCommented:CurrentUser?.result.name,
          }
            
          ));
           setcommentText(""); 
        }
        }
        else{
            alert("Plz Login to comment!!")
        }
       
    }
  return (
    <>
     <form className='comments-sub-form-comments'
     onSubmit={handleOnSubmit}
     >
        <input type="text"
        onChange={e=>setcommentText(e.target.value)}
        placeholder='add comment...'
        value={commenttext}
        className='comment-ibox'
        />
        <input type="submit" value="add" className='comment-add-btn-comments'    />
        </form> 
        <div className="display-comment-container">
            {
                commentList?.data?.filter(q=>videoId===q?.videoId).reverse().map(m=>{
                    return (
                         <DisplayComments
                         cId={m._id}
                         userId={m.userId}
                         commentBody={m.commentBody}
                         commentOn={m.commentOn}
                         userCommented={m.userCommented}
                         />
                    )
                })
            }
           
        </div>
    </>
  )
}

export default Comments
