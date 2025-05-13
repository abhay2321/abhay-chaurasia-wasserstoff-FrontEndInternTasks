import { useEffect, useState } from "react";
import "./App.css";
import { auth } from "./firebase-config";
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { TextEditor } from "./components/texteditor";

function App() {
  const [roomId, setRoomId] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    signInAnonymously(auth);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        console.log("user signed in: ", user.uid);
      }
    });
  }, []);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (roomId.trim() && username.trim()) {
      setIsJoined(true);
    }
  };

  if (!isJoined) {
    return (
      <div className="room-form">
        <header>
          <h1>Collaborative Text Editor</h1>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              required
            />
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter Room ID"
              required
            />
            <button type="submit">
              {roomId ? "Join Room" : "Create New Room"}
            </button>
          </form>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="head">
        <h3><strong>Room: </strong>{roomId}</h3>
        <h2>Welcome {username}</h2>
        <p><strong>Your ID: </strong>{userId.slice(0, 7)}</p>
      </header>
      <TextEditor roomId={roomId} userId={userId} username={username} />
    </div>
  );
}

export default App;