import express, { json } from 'express';
import http from 'http'
import { Server } from 'socket.io'
import { frontend_url } from './EnvVar.js';
import { enqueueSong, playlist5, playNextSong } from './logic.js'

const port = 3000
const app = express()
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: frontend_url, methods: ["GET", "POST"] } });

let currentSong = "";
let currentChannel = "";

app.use(express.json())
app.use(express.text());

app.get('/', (req, res) => {
    console.log(req.headers['authorization']);
    res.send('Hello World!');
})

app.post('/info', (req, res) => {
    let title = req.body.find(e => e[0] === 'title');
    let artist = req.body.find(e => e[0] === 'artist');
    if (title && artist) {
        currentSong = title[1];
        currentChannel = artist[1];
        console.log(currentSong, currentChannel);
    }else{
        currentSong = "";
        currentChannel = "";
    }
    io.emit('song-change', { title: currentSong, channel: currentChannel });
    res.send("info res");
})

app.post('/song', (req, res) => {
    if (typeof (req.body)) {
        if (enqueueSong(String(req.body))) {
            io.emit('playlist-change', playlist5());
            res.send("okay");
        }
        else res.send("not okay");
    }
})

app.get('/nextsong', async (req, res) => {
    const ans = await playNextSong();
    io.emit('playlist-change', playlist5());
    res.send("okay");
})


io.on('sendMessage', (msg) => {
    console.log("message");
    io.emit('message', msg);
})

io.on('connection', (socket) => {
    console.log('new connection: ', socket.id);
    socket.on('disconnect', (reason) => console.log(reason));
    socket.on('sendMessage', (msg) => {
        console.log("message");
        io.emit('message', msg);
    })

    io.emit('song-change', { title: currentSong, channel: currentChannel });
    io.emit('playlist-change', playlist5());
})


server.listen(port, () => {
    console.log(`listening on port: `, port);
})

