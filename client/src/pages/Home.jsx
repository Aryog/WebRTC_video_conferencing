import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
const Homepage = () => {
    const [email, setEmail] = useState("");
    const [roomId, setRoomId] = useState("");

    const socket = useSocket();
    const navigate = useNavigate();


    const handleRoomJoined = useCallback(({ roomId }) => {
        console.log('Room Joined', roomId);
        navigate(`/room/${roomId}`);
    }, [navigate]);


    useEffect(() => {
        socket.on("room:join", handleRoomJoined)
        return () => {
            socket.off("room:join", handleRoomJoined)
        }
    }, [socket, handleRoomJoined])

    const handleJoinRoom = () => {
        socket.emit("room:join", { emailId: email, roomId })
    }
    return (
        <div className="homepage-container">
            <div className="input-container">
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="" id="" placeholder="Enter your email here" />
                <input value={roomId} onChange={e => setRoomId(e.target.value)} type="text" name="" id="" placeholder="Enter Room Code" />
                <button onClick={handleJoinRoom}>Enter Room</button>
            </div>
        </div>
    )
}
export default Homepage;