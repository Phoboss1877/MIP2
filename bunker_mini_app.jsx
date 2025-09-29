import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function BunkerApp() {
  const [screen, setScreen] = useState("lobby");
  const [roomCode, setRoomCode] = useState("");
  const [players, setPlayers] = useState([
    { id: 1, name: "Игрок 1" },
    { id: 2, name: "Игрок 2" },
    { id: 3, name: "Игрок 3" }
  ]);
  const [catastrophe] = useState("Ядерная война. В бункере места на 4 человека.");

  // Mock start game
  const startGame = () => setScreen("game");
  const backToLobby = () => setScreen("lobby");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
      {screen === "lobby" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-center">Бункер</h1>
          <Button className="w-full bg-white text-black rounded-2xl" onClick={() => setScreen("room")}>Создать комнату</Button>
          <input
            type="text"
            placeholder="Введите код"
            className="w-full p-2 rounded-2xl text-black"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          {roomCode && <Button className="w-full bg-white text-black rounded-2xl">Присоединиться</Button>}
        </motion.div>
      )}

      {screen === "room" && (
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="w-full max-w-sm space-y-4">
          <h2 className="text-xl font-semibold text-center">Комната 123</h2>
          <Card className="bg-gray-900 rounded-2xl">
            <CardContent className="space-y-2">
              <div className="flex justify-between"><span>Игроки</span><span>{players.length}</span></div>
              <div className="flex justify-between"><span>Катастрофа</span><span>Случайная</span></div>
            </CardContent>
          </Card>
          <Button className="w-full bg-white text-black rounded-2xl" onClick={startGame}>Начать</Button>
        </motion.div>
      )}

      {screen === "game" && (
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full max-w-md space-y-4">
          <Card className="bg-gray-900 rounded-2xl">
            <CardContent>
              <h3 className="font-bold mb-2">Катастрофа</h3>
              <p>{catastrophe}</p>
            </CardContent>
          </Card>
          <div className="space-y-2">
            {players.map((p) => (
              <Card key={p.id} className="bg-gray-800 rounded-2xl">
                <CardContent className="flex justify-between items-center">
                  <span>{p.name}</span>
                  <Button variant="outline" className="text-xs">Выгнать</Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button className="w-full bg-white text-black rounded-2xl" onClick={() => setScreen("result")}>Голосование</Button>
        </motion.div>
      )}

      {screen === "result" && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-sm space-y-4 text-center">
          <h2 className="text-2xl font-bold">Результат</h2>
          <p className="text-lg">Вы выжили 🎉</p>
          <Button className="w-full bg-white text-black rounded-2xl" onClick={backToLobby}>Сыграть ещё раз</Button>
        </motion.div>
      )}
    </div>
  );
}