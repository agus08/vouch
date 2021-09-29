import Messages from "../messages/messages";
import src from "../../../img/send.png";

import "./rowContent.css";

const RowContent = ({
    message,
    setMessage,
    sendMessage,
    messages,
    username,
    room,
}) => {
    return (
        <div id="row-content-main-container">
            <h1>{room.roomId}</h1>
            <div id="message-box">
                <Messages messages={messages} username={username} />
            </div>

            <form id="form">
                <input
                    type="text"
                    value={message}
                    placeholder="Message..."
                    onChange={event => setMessage(event.target.value)}
                    onKeyPress={event =>
                        event.key === "Enter" ? sendMessage(event) : null
                    }
                />
                <button onClick={event => sendMessage(event)}>
                    <img src={src} alt="send" />
                </button>
            </form>
        </div>
    );
};

export default RowContent;