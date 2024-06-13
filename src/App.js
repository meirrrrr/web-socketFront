import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {!showChat ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-80">
          <h3 className="text-2xl font-semibold mb-4">Join A Chat</h3>
          <input
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={joinRoom}
          >
            Join A Room
          </button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
