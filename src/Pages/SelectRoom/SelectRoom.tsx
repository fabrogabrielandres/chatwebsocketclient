import { useState } from "react";
// import { useNavigate } from "react-router";
import { useWebSocketStore } from "../../stores/websocket/websocket.store";

export const SelectRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");
  const { availableRooms, joinRoom } = useWebSocketStore();
//   const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedRoomName = roomName.trim();

    if (!trimmedRoomName) {
      setError("Please enter a room name");
      return;
    }

    // Verificar si la sala existe
    if (availableRooms.includes(trimmedRoomName)) {
        console.log("availableRooms",availableRooms);
        
        joinRoom(trimmedRoomName)
        //   navigate(`/dashboard/general?roomName=${trimmedRoomName}`);
    } else {
        console.log("elseee availableRooms",availableRooms);
      setError(`Room "${trimmedRoomName}" does not exist`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Enter Room Name
        </h2>

        <div className="mb-6">
          <label
            htmlFor="roomName"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Room Name
          </label>
          <input
            type="text"
            id="roomName"
            value={roomName}
            onChange={(e) => {
              setRoomName(e.target.value);
              setError(""); // Limpiar error al escribir
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Enter the room name"
            required
          />
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
        >
          Enter Room
        </button>
      </form>
    </div>
  );
};
