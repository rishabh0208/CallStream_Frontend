import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../provider/Socketprovider';
import './videocall.css';

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const isWithinAllowedTime = () => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 18 && hour < 24; // 6 PM to 12 AM
  };

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      if (!isWithinAllowedTime()) {
        alert("Please come after 6 PM and before 12 AM to join videocall");
        return;
      }
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className='videocall_page'>
      <h1>VideoCall</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">Email ID:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Number:</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button className='join_button'>Join</button>
      </form>
    </div>
  );
};

export default LobbyScreen;
