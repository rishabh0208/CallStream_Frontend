import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer.js";
import { useSocket } from "../provider/Socketprovider.jsx";
import './videocall.css';

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [screenStream, setScreenStream] = useState(null);
  const [localMediaRecorder, setLocalMediaRecorder] = useState(null);
  const [remoteMediaRecorder, setRemoteMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const [localChunks, setLocalChunks] = useState([]);
  const [remoteChunks, setRemoteChunks] = useState([]);

  const downloadRecordedData = useCallback((localChunks, remoteChunks) => {
    if (localChunks.length === 0 && remoteChunks.length === 0) return;

    const localBlob = new Blob(localChunks, { type: 'video/webm' });
    const remoteBlob = new Blob(remoteChunks, { type: 'video/webm' });

    const localUrl = URL.createObjectURL(localBlob);
    const remoteUrl = URL.createObjectURL(remoteBlob);

    const localLink = document.createElement('a');
    localLink.href = localUrl;
    localLink.download = 'local_video.webm';
    localLink.style.display = 'none';

    const remoteLink = document.createElement('a');
    remoteLink.href = remoteUrl;
    remoteLink.download = 'remote_video.webm';
    remoteLink.style.display = 'none';

    document.body.appendChild(localLink);
    document.body.appendChild(remoteLink);

    localLink.click();
    remoteLink.click();

    // Cleanup
    URL.revokeObjectURL(localUrl);
    URL.revokeObjectURL(remoteUrl);
    document.body.removeChild(localLink);
    document.body.removeChild(remoteLink);
  }, []);

  const startRecording = useCallback(() => {
    if (!myStream || !remoteStream) return;

    const options = { mimeType: 'video/webm' };

    const localRecorder = new MediaRecorder(myStream, options);
    const remoteRecorder = new MediaRecorder(remoteStream, options);

    const newLocalChunks = [];
    const newRemoteChunks = [];

    localRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        newLocalChunks.push(event.data);
      }
    };

    remoteRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        newRemoteChunks.push(event.data);
      }
    };

    localRecorder.start();
    remoteRecorder.start();

    setLocalMediaRecorder(localRecorder);
    setRemoteMediaRecorder(remoteRecorder);
    setLocalChunks(newLocalChunks);
    setRemoteChunks(newRemoteChunks);
    setIsRecording(true);
  }, [myStream, remoteStream]);

  const stopRecording = useCallback(() => {
    let localStopped = false;
    let remoteStopped = false;

    const handleStop = () => {
      if (localStopped && remoteStopped) {
        const userConfirmed = window.confirm("Do you want to download the recorded data?");
        if (userConfirmed) {
          downloadRecordedData(localChunks, remoteChunks);
        }
        setLocalChunks([]);
        setRemoteChunks([]);
      }
    };

    const handleLocalStop = () => {
      localStopped = true;
      handleStop();
    };

    const handleRemoteStop = () => {
      remoteStopped = true;
      handleStop();
    };

    if (localMediaRecorder) {
      localMediaRecorder.onstop = handleLocalStop;
      localMediaRecorder.stop();
    }

    if (remoteMediaRecorder) {
      remoteMediaRecorder.onstop = handleRemoteStop;
      remoteMediaRecorder.stop();
    }

    setIsRecording(false);
  }, [localMediaRecorder, remoteMediaRecorder, localChunks, remoteChunks, downloadRecordedData]);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
    if (screenStream) {
      for (const track of screenStream.getTracks()) {
        peer.peer.addTrack(track, screenStream);
      }
    }
  }, [myStream, screenStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams[0];
      console.log("GOT TRACKS!!", ev);
      setRemoteStream(remoteStream);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  const stopScreenShare = useCallback(() => {
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
      setIsScreenSharing(false);
      socket.emit("screen-share:stop", { to: remoteSocketId });
    }
  }, [screenStream, remoteSocketId, socket]);

  const startScreenShare = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setScreenStream(stream);
      setIsScreenSharing(true);

      stream.getTracks().forEach(track => {
        peer.peer.addTrack(track, stream);
      });

      stream.getTracks()[0].onended = () => {
        stopScreenShare();
      };

      socket.emit("screen-share:start", { to: remoteSocketId, stream });

    } catch (error) {
      console.error("Error sharing screen:", error);
    }
  }, [stopScreenShare, remoteSocketId, socket]);

  const handleScreenShareStart = useCallback(async ({ from, stream }) => {
    console.log("Screen share started by", from);
    setRemoteStream(stream);
  }, []);

  const handleScreenShareStop = useCallback(() => {
    console.log("Screen share stopped");
    setRemoteStream(null);
  }, []);

  useEffect(() => {
    socket.on("screen-share:start", handleScreenShareStart);
    socket.on("screen-share:stop", handleScreenShareStop);

    return () => {
      socket.off("screen-share", handleScreenShareStart);
socket.off("screen-share", handleScreenShareStop);
};
}, [socket, handleScreenShareStart, handleScreenShareStop]);

return (
<div className="Stream_page">
<h1>VideoCall Page</h1>
<h4>{remoteSocketId ? "Connected" : "No one in room"}</h4>
{myStream && <button onClick={sendStreams}>Send Stream</button>}
{remoteSocketId && <button onClick={handleCallUser}>CALL</button>}
<h5>click on call to join videocall or to go back to stream after screen share.</h5>
{myStream && !isRecording && !isScreenSharing && (
<button onClick={startRecording}>Start Recording</button>
)}
{myStream && isRecording && (
<button onClick={stopRecording}>Stop Recording</button>
)}
{!isScreenSharing && (
<button onClick={startScreenShare}>Start Screen Share</button>
)}
{isScreenSharing && (
<button onClick={stopScreenShare}>Stop Screen Share</button>
)}
<div className="video-container">
<div className="local-video">
<h2>{isScreenSharing ? "My Screen Share" : "My Stream"}</h2>
{myStream && !isScreenSharing && (
<ReactPlayer
           playing
           muted={true}
           height="200px"
           width="400px"
           url={myStream}
         />
)}
</div>
<div className="remote-video">
<h2>Remote Stream</h2>
{remoteStream && (
<ReactPlayer
           playing
           muted={false}
           height="200px"
           width="400px"
           url={remoteStream}
         />
)}
</div>
</div>
</div>
);
};

export default RoomPage;
