import { useState } from "react";
import { backend_url } from "./EnvVar";
const ReqBox = () => {
    const [text, setText] = useState('');
    const [sent, setSent] = useState(false);
    const [cooldown, setCooldown] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cooldown) {
            setError(true);
            setErrorText("You can only send 1 request per minute!");
        }
        else {
            setError(false);
            fetch(`${backend_url}/song`, { mode: 'no-cors', method: 'POST', headers: { "Content-Type": "text/plain" }, body: text })
            setSent(true);
            setText('Request Sent!');
            setCooldown(true);
            setTimeout(() => setCooldown(false), 60000);
        }
    }

    return (
        <div className='requestBox'>
            <form>
                <label>Send request:</label>
                <input type="text" required value={text} onChange={(e) => { setSent(false); setText(e.target.value) }} />
                {sent && <button disabled={true}> Send Request</button>}
                {!sent && <button onClick={(e) => handleSubmit(e)}> Send Request </button>}
            </form>
            {error && <text> {errorText} </text>}
        </div>
    )
}

export default ReqBox;