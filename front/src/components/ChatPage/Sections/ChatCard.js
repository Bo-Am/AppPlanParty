import React from "react";
function ChatCard(props) {
  const {user, oneMes} = props;
  return (
    <div className="message-box">
      <div className="message-box_name">{user.name}:</div>
      <div className="message-box_text">{oneMes}</div>
    </div>
  );
}

export default ChatCard;
