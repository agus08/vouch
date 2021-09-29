import { useState } from "react";
import { useHistory } from 'react-router-dom';
import "./join.css";

const Join = () => {
    const history = useHistory();
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("");

    const END_POINT = ""; //use localhost:5002 on debug

    const joinRoom = async () => {
        setLoading(true);

        try {
            const res = await fetch(END_POINT + "/api/join", {
                method: 'POST',
                body: JSON.stringify({ roomId: room, username: name }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            const response = await res.json();

            setLoading(false)
            if (response.error) {
                setErrorMsg(response.message)
            } else {
                history.push(`/chat?username=${name}&roomId=${room}`);
            }
        } catch (error) {
            console.log('error', error)
            setLoading(false)
            setErrorMsg('Something went wrong, try again later');
        }
    }

    return (
        <div className="joinOuterContainer">
            <div className="inputList">
                <h1 className="heading">Join Chatroom</h1>
                {errorMsg && <p>{errorMsg}</p>}

                <div className="inputGroup">
                    <input
                        type="text"
                        className="joinInput"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        placeholder={'Username'}
                        spellCheck="false"
                        autoCapitalize="words"
                        autoComplete="off"
                        required
                    />
                </div>
                <div className="inputGroup">
                    <input
                        type="text"
                        className="joinInput"
                        onChange={e => setRoom(e.target.value)}
                        value={room}
                        placeholder={'Room'}
                        spellCheck="false"
                        autoCapitalize="words"
                        autoComplete="off"
                        required
                    />
                </div>

            </div>
            <div className="columnFooter">
                <button type="button" className="joinButton" disabled={loading} onClick={joinRoom}>
                    Join
                </button>
            </div>
        </div>
    );
};

export default Join;