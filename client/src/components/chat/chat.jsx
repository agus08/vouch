
import { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import RowContent from './rowContent/rowContent'

let socket;

const Chat = ({ location }) => {
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const [room, setRoom] = useState({})
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const END_POINT = ""; //use localhost:5002 on debug

    useEffect(() => {
        let { username, roomId } = queryString.parse(location.search);

        socket = io('', {
            transports: ['websocket'],
        });

        setUsername(username);
        setRoomId(roomId);

        socket.emit("join", { username, roomId });

        return () => {
            socket.emit("disconnect");
            socket.off();
        };
    }, [END_POINT, location.search]);

    useEffect(() => {
        socket.on("message", message => {
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ room, messages }) => {
            setRoom(room);
            setMessages(messages.reverse())
        });
    }, []);

    //send message function

    const sendMessage = event => {
        event.preventDefault();

        if (message) {
            socket.emit("sendMessage", { sender: username, roomId, message });
            setMessage("");
        }
    };

    return (
        <div className="main-chat-container">
            <div className="chat-container">
                <RowContent
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                    messages={messages}
                    username={username}
                    room={room}
                />
            </div>
        </div>
    );
};

export default Chat;