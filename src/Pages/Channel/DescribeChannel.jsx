import React from "react";
import { FaEdit, FaUpload } from "react-icons/fa";
import "./DescribeChannel.css";
import { useSelector } from "react-redux";

function DescribeChannel({ setEditCreateChannelBtn, cid ,setVidUploadPage}) {

  const channel = useSelector((state) => state?.channelReducers);
    //console.log(channel);
  const currentchannel = channel.filter((c) => c._id === cid)[0];
   //console.log(currentchannel);
  const CurrentUser = useSelector((state) => state?.currentUserReducer);
  //const points = useSelector((state) => state?.points?.data); 

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
            <b> Total Points: {CurrentUser?.result?.points} </b>
          </div>
        </>
      )}
    </div>
  );
}

export default DescribeChannel;
