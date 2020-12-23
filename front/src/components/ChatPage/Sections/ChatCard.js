import React from "react";
// import styles from "./Message.module.css";
function ChatCard({ oneMes, username }) {
  return (
    <div>
      <div>{username}:</div>
      <div>{oneMes}</div>
    </div>
  );
}

export default ChatCard;
