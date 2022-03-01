import React from "react";
import SocketIOClient from "socket.io-client";
import { API_URL } from "../lib/api";

export const socket = SocketIOClient.connect(API_URL + "/streamer");
const SocketContext = React.createContext();

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return React.useContext(SocketContext);
};
