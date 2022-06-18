const SongInfo = (props) => {
    return (
        <div className='songinfo'>
            <h1>Currently playing: {props.title} - {props.channel}</h1> 
        </div>
    )
}

export default SongInfo;