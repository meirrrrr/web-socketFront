import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    const receiveMessageHandler = (data) => {
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive_message", receiveMessageHandler);

    return () => {
      socket.off("receive_message", receiveMessageHandler);
    };
  }, [socket]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-blue-500 text-white p-4 text-center font-semibold text-xl">
        Live Chat
      </div>
      <div className="flex-1 overflow-auto p-4">
        <ScrollToBottom className="flex flex-col space-y-4">
          {messageList.map((messageContent, index) => (
            <div
              key={index}
              className={`p-4 rounded shadow-md ${
                username === messageContent.author
                  ? "bg-blue-100 self-end"
                  : "bg-white self-start"
              }`}
            >
              <div>
                <div className="text-gray-800">{messageContent.message}</div>
                <div className="text-xs text-gray-500 flex justify-between">
                  <span>{messageContent.time}</span>
                  <span>{messageContent.author}</span>
                </div>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="flex items-center p-4 bg-white border-t border-gray-300">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          &#9658;
        </button>
      </div>
    </div>
  );
}

export default Chat;
