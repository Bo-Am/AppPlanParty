
import React, { useEffect, useState } from "react";
import socket from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import {sendMessageAC, sendRoom}  from "../../actions/chat_actions";
import ChatCard from "./Sections/ChatCard";
import {SEND_MESSAGE} from '../../actions/types'
import { useParams } from "react-router-dom";

function ChatPage() {
  const [message, setMessage] = useState("");
  const [write, setWrite] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((store)=>store.auth.user)
  const room = useParams().id;
  const messageText = (e) => {
    setMessage(e.target.value);
    setWrite('Печатает')
  };

  const sendMessage = () => {
    dispatch({
      type: SEND_MESSAGE,
      payload: {room, message, user}, 
    });
    socket.emit("NEW_MESSAGE", [room, message, user]);
    setMessage("");
  };
  

  const onKeyDown = (e) => {
    if (e.keyCode == 13) sendMessage();
  };

  useEffect(() => {
    socket.on("NEW_MESSAGE:CLIENT", (room, message, user) => {
      dispatch({
        type: SEND_MESSAGE,
        payload: {room, message, user}, 
      });
    });

    socket.on("initMSG", (arr) => {
      let messages = [];
      arr.map(el => messages.push({
       user: el.user,
       room: el.room,
       message: el.message,
      }))
      if(arr.length && arr[0]){
       dispatch({type:'initmsg',payload: messages})
      }
    });

    socket.emit("CONNECT_ROOM", room);

    return ()=>{
      dispatch({type:'clean'})
      socket.emit('leaveRoom', room);
      console.log('<><><><><')
    }

  }, []);

  useEffect(() => {
      socket.emit("WRITE_MESSAGE",  [room, user]);
      socket.on("WRITE_MESSAGE:CLIENT", (user) => {
        console.log('herereerererer');
        setWrite(`${user.name} печатает...`);
        setTimeout(() => {
          setWrite("");
        }, 2000);
        console.log(user);
      });
    }, [message]);

  const chat = useSelector((store) => store.chat.messages);

  return (
    <div className="chatContainer">
      <div className='chat-area'>
        <div>{write}</div>
        {chat && 
          chat.map((oneMes, i) => (
            oneMes.user && <ChatCard oneMes={oneMes.message} user={oneMes.user} key={Math.random()}  />
          )).reverse()}
      </div>
      <div className="input-box">
        <textarea
          name="massage-input"
          value={message}
          onChange={messageText}
          onKeyDown={onKeyDown}
        />
        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPage;
