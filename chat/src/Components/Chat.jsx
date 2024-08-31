import React, { useContext } from "react";
import {Messages} from "./Messages";
import {Input} from "./Input";
import { ChatContext } from "../context/ChatContext";

export const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
            <img src={process.env.PUBLIC_URL + '/img/icon-camera.png'} alt="icon-camera"/>
            <img src={process.env.PUBLIC_URL + '/img/icon-user.png'} alt="icon-user"/>
            <img src={process.env.PUBLIC_URL + '/img/icon-more.png'} alt="icon-more"/>
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};
