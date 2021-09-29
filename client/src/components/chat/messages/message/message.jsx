import "./message.css";

import ReactEmoji from "react-emoji";

const Message = ({ message, username }) => {
    let isSentByTheCurrentUser = false;

    const trimmedName = username.trim().toLowerCase();

    if (message) {
        if (message.sender === trimmedName) {
            isSentByTheCurrentUser = true;
        }
        if (isSentByTheCurrentUser) {
            return (
                <div className="message-container current-user-container">
                    <div className="message-box current-box">
                        <p className="sent-text">{ReactEmoji.emojify(message.message)} </p>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="message-container other-user-container">
                    <div className="message-box other-box-container">
                        <p className="sent-by">{message.sender}</p>
                        <div className="message-box other-box">
                            <p className="sent-text">{ReactEmoji.emojify(message.message)} </p>
                        </div>
                    </div>

                </div>
            );
        }
    }
    return null;
};

export default Message;