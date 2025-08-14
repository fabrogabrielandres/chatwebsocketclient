import { useEffect, useState } from "react";
import { useWebSocketStore } from "../../stores/websocket/websocket.store";
import { useNavigate } from "react-router";

export const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const { createRoom, roomError, availableRooms } = useWebSocketStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (roomName && availableRooms.includes(roomName) && !roomError) {
      navigate(`/dashboard/general?roomName=${roomName}`);
    }
  }, [availableRooms, roomError, roomName, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomName.trim()) {
      createRoom(roomName.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create new room
        </h2>

        <div className="mb-4">
          <label
            htmlFor="roomName"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Room name
          </label>
          <input
            type="text"
            id="roomName"
            value={roomName}
            onChange={(e) => {
              setRoomName(e.target.value);
              // Limpiar error cuando el usuario escribe
              if (roomError) useWebSocketStore.getState().roomError = null;
            }}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
              roomError ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter the name of the room"
            required
          />
          {roomError && (
            <p className="mt-2 text-sm text-red-600">{roomError}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
        >
          Create room
        </button>
      </form>
    </div>
  );
};
