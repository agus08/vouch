import Message from "./message/message";
import ScrollToBottom from "react-scroll-to-bottom";
import "./messages.css";

const Messages = ({ messages, username }) => {
    return (
        <ScrollToBottom className="message-boxx">
            {messages.map((message, i) => (
                <div key={i}>
                    <Message message={message} username={username} />
                </div>
            ))}
        </ScrollToBottom>
    );
};

export default Messages;