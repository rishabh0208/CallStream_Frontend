import React,{useState} from 'react'
import './Comments.css'
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment, editComment } from '../../actions/comments';
import moment from 'moment';

const DisplayComments = ({cId,commentBody,userId,commentOn,userCommented}) => {
    const dispatch= useDispatch();
    const [edit,setedit]=useState(false);
    const [commentBdy,setcommentBdy]=useState("")
    const [cmtId, setcmtId]= useState("")
    const CurrentUser = useSelector((state) => state?.currentUserReducer);

    const handleEdit=({cId,ctBody})=>{
       setedit(true);
        setcmtId(cId)
       setcommentBdy(ctBody);
    }

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        if(!commentBdy){
          alert("Type Your Comment!")
        }
        else{
          dispatch(editComment(
            {
              id:cId,
              commentBody:commentBdy,
            }
          ));
          setcommentBdy("")
        }
        setedit(false);
    }

    const handleDel=(id)=>{
      dispatch(deleteComment(id))
    }
  return (
    <> 
    {
        edit ? (<>
         <form className='comments-sub-form-comments'
         onSubmit={handleOnSubmit}
     >
        <input type="text"
        onChange={e=>setcommentBdy(e.target.value)}
        placeholder='add comment...'
        value={commentBdy}
        className='comment-ibox'
        />
        <input type="submit" value="Change" className='comment-add-btn-comments'    />
        </form> 
        </>):(
         <p className='comment-body'> {commentBody}</p>
        )
    }
   
    <p className='usercommented'> - {userCommented} commented {moment(commentOn).fromNow()}</p>
   {
    CurrentUser?.result._id === userId &&(
      <p className="Editdel-displaycomment">
        <i onClick={()=>handleEdit(cId,commentBody)} >Edit</i>
        <i onClick={()=>handleDel(cId)}>  Delete</i>
    </p>
    )
   }
    
    </>
  

  )
}

export default DisplayComments
