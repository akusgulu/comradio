import { useState, useContext } from 'react';
import './App.css';
import Radio from './Radio';
import ReqBox from './ReqBox';
import SongInfo from './Title';
import ChatBox from './ChatBox';
import { SocketProvider, SocketContext } from './Socket'
import Playlist from './Playlist';

const random_name = () => {
  const adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long", "late", "lingering", "bold", "little", "morning", "muddy", "old", "red", "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering", "withered", "wild", "black", "young", "holy", "solitary", "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine", "polished", "ancient", "purple", "lively", "nameless"];
  const nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly", "feather", "grass", "haze", "mountain", "night", "pond", "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder", "violet", "water", "wildflower", "wave", "water", "resonance", "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog", "smoke", "star"];
  return (
    adjs[Math.floor(Math.random() * adjs.length)] +
    "_" +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
}
const user_name = random_name();

function App() {
  const [info, setInfo] = useState({ title: "", channel: "" });
  // const [chat, setChat] = useState(false)
  const [messages, setMessages] = useState([]);
  const socket = useContext(SocketContext);
  const [playlist, setPlaylist] = useState([]);

  socket.on('song-change', (info) => setInfo(info));
  socket.on('message', (msg) => setMessages([...messages, msg]));
  socket.on('playlist-change', (playlist) => setPlaylist(playlist));

  return (

    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <h1> Community Radio</h1>
      <SocketProvider>
        <Radio />
        <SongInfo title={info.title} channel={info.channel} />
        <Playlist playlist={playlist} />
        <ReqBox />
        <ChatBox messages={messages} name={user_name} />
      </SocketProvider>
    </div>
  );
}

export default App;
