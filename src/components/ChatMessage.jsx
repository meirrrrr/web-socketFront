import React from "react";

const ChatMessage = ({ message }) => {
  return <div className="p-2 mb-2 bg-white rounded shadow">{message}</div>;
};

export default ChatMessage;
