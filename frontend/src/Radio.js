import { radioUrl } from "./EnvVar";

const Radio = () => {

    return (
        <div className='radio'>
            <audio controls preload='none'>
                <source src={`${radioUrl}/live`} type="audio/mpeg"/>
            </audio>
        </div>
    )
}

export default Radio;