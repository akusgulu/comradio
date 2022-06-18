const Playlist = (props) => {

    return (
        <div className="Playlist">
            <h1>{props.playlist.length === 0 ? "Playlist is empty" : "Playlist:"}</h1>
            {props.playlist.map(song => <div> {song.url} - {song.count}</div>)}
        </div>

    );
}
export default Playlist;