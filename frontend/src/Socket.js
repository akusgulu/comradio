import { createContext } from 'react';
import { io} from 'socket.io-client';
import { backend_url } from './EnvVar';

const socket = io(backend_url);
const SocketContext = createContext(socket);

socket.on('connect', () => console.log('connected to socket'));

const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    );
};
export { SocketContext, SocketProvider };