import { useState } from "react";
import { useNavigate } from "react-router";

export const CreateRoom = () => {
  const navigate = useNavigate();

  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Aquí iría la lógica para crear la sala
      console.log("Creando sala:", { roomName, roomPassword });
      // Suponiendo que la creación fue exitosa, redirigimos
      navigate("/dashboard/rooms");
    } catch (error) {
      console.log(error);
      alert("Error al crear la sala");
    }
  };

  return (
    <>
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
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Enter the name of the room"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="roomPassword"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password (optional)
            </label>
            <input
              type="password"
              id="roomPassword"
              value={roomPassword}
              onChange={(e) => setRoomPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              placeholder="Ingresa una contraseña para la sala"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
          >
            Create room
          </button>
        </form>
      </div>
    </>
  );
};
