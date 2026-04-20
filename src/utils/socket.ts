import { io, Socket } from "socket.io-client";
import { baseURL } from "../consts";

let socket: Socket;

export const connectSocket = (token: string) => {
    socket = io(baseURL, {
        auth: { token }
    });
    return socket;
}

export const getSocket = () => socket;