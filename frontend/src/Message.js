const Message = (props) => {

    return (
        <div className="message">
            <div><b>{props.sendername}: </b><span>{props.body}</span></div>
        </div>
    );
}
export default Message;