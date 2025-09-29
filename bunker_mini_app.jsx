import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import "./index.css"; // Tailwind подключается через CDN в index.html

function BunkerApp() {
  const [screen, setScreen] = useState("lobby");
  const [roomCode, setRoomCode] = useState("");
  const [players, setPlayers] = useState([
    { id: 1, name: "Игрок 1" },
    { id: 2, name: "Игрок 2" },
    { id: 3, name: "Игрок 3" }
  ]);
  const [catastrophe] = useState("Ядерная война. В бункере места на 4 человека.");

  const startGame = () => setScreen("game");
  const backToLobby = () => setScreen("lobby");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
      {screen === "lobby" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-center">Бункер</h1>
          <button className="w-full bg-white text-black p-3 rounded-2xl" onClick={() => setScreen("room")}>Создать комнату</button>
          <input
            type="text"
            placeholder="Введите код"
            className="w-full p-2 rounded-2xl text-black"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          {roomCode && <button className="w-full bg-white text-black p-3 rounded-2xl">Присоединиться</button>}
        </motion.div>
      )}

      {screen === "room" && (
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="w-full max-w-sm space-y-4">
          <h2 className="text-xl font-semibold text-center">Комната 123</h2>
          <div className="bg-gray-900 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between"><span>Игроки</span><span>{players.length}</span></div>
            <div className="flex justify-between"><span>Катастрофа</span><span>Случайная</span></div>
          </div>
          <button className="w-full bg-white text-black p-3 rounded-2xl" onClick={startGame}>Начать</button>
        </motion.div>
      )}

      {screen === "game" && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-md space-y-4">
          <div className="bg-gray-900 rounded-2xl p-4">
            <h3 className="font-bold mb-2">Катастрофа</h3>
            <p>{catastrophe}</p>
          </div>
          <div className="space-y-2">
            {players.map((p) => (
              <div key={p.id} className="bg-gray-800 rounded-2xl p-3 flex justify-between items-center">
                <span>{p.name}</span>
                <button className="border border-gray-400 px-2 py-1 rounded text-xs">Выгнать</button>
              </div>
            ))}
          </div>
          <button className="w-full bg-white text-black p-3 rounded-2xl" onClick={() => setScreen("result")}>Голосование</button>
        </motion.div>
      )}

      {screen === "result" && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-sm space-y-4 text-center">
          <h2 className="text-2xl font-bold">Результат</h2>
          <p className="text-lg">Вы выжили 🎉</p>
          <button className="w-full bg-white text-black p-3 rounded-2xl" onClick={backToLobby}>Сыграть ещё раз</button>
        </motion.div>
      )}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<BunkerApp />);
