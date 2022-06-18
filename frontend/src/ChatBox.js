import { useContext, useState } from "react";
import Message from "./Message";
import { SocketContext } from "./Socket";

const ChatBox = (props) => {
    const [text, setText] = useState('Send a message');
    const socket = useContext(SocketContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("hello");
        console.log(socket.id);
        console.log(socket.emit('sendMessage',{"sendername":props.name,"body":text}));
        setText("")
    }

    return (
        <div className="chatbox">
            <div className="messageBox">
            {props.messages.map( message => <Message sendername={message.sendername} body={message.body}/>)}
            </div>
            <form className="chatform" onSubmit={handleSubmit}>
                <input required value={text} onChange={(e) => {setText(e.target.value) }} />
                <button type="submit"/>
            </form>
        </div>
    );
}

export default ChatBox;