import React, { useEffect } from "react";
import { useSocket } from '../providers/socket'
const RoomPage = () => {
    const { socket } = useSocket();
    const handleNewUserJoined = (data) => {
        const { emailId } = data
        console.log('New user joined room', emailId);
    }
    useEffect(() => {
        socket.on('user-joined', handleNewUserJoined)
    }, [])
    return (
        <div className="room-page-container">
            <h1>Room Page</h1>
        </div>
    )
}
export default RoomPage;