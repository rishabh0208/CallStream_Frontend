import React, { useEffect } from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import "./DescribeChannel.css";
import { useDispatch, useSelector } from "react-redux";
import { updateChannelData } from "../../actions/channelUser";

function DescribeChannel({ setEditCreateChannelBtn, cid ,setVidUploadPage}) {
   const dispatch = useDispatch();
  const channel = useSelector((state) => state?.channelReducers);
    //console.log(channel);
  const currentchannel = channel.filter((c) => c._id === cid)[0];
   //console.log(currentchannel);
  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  useEffect(() => {
    if (CurrentUser) {
      dispatch(updateChannelData(CurrentUser?.result._id,{points:CurrentUser?.result.points})); // Fetch updated user data
    }
  }, [dispatch, CurrentUser]);

  return (
    <div className="conatiner3-channel">
      <div className="channel-logo-channel">
        <b>{currentchannel?.name.charAt(0).toUpperCase()}</b>
      </div>

      <div className="description-channel">
        <b> {currentchannel?.name}</b>
        <p> {currentchannel?.desc}</p>
      </div>
      {CurrentUser?.result._id === currentchannel?._id && (
        <>
          <p
            className="editbtn-channel"
            onClick={() => {
              setEditCreateChannelBtn(true);
            }}
          >
            <FaEdit />
            <b> Edit Channel</b>
          </p>
          <p className="uploadbtn-channel"
              onClick={()=>setVidUploadPage(true)}
          >
            <FaUpload />
            <b> Upload Video</b>
          </p>
          <div className="user-points">
            <b> Total Points: {CurrentUser?.result.points} </b>
            (Relogin to update points.)
          </div>

        </>
      )}
    </div>
  );
}

export default DescribeChannel;
