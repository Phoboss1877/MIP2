import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function BunkerGameUI() {
  const [players, setPlayers] = useState([
    { id: 1, name: "Игрок 1" },
    { id: 2, name: "Игрок 2" },
    { id: 3, name: "Игрок 3" },
  ]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      {/* Заголовок */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold tracking-widest mb-8"
      >
        БУНКЕР
      </motion.h1>

      {/* Карточки игроков */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-3xl mb-8">
        {players.map((player) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className=""
          >
            <Card className="bg-neutral-900 border border-neutral-700 rounded-2xl shadow-lg">
              <CardContent className="p-4 text-center text-xl">
                {player.name}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Кнопки */}
      <div className="flex gap-4">
        <Button className="bg-white text-black hover:bg-neutral-300 rounded-2xl px-6 py-3">
          Создать лобби
        </Button>
        <Button className="bg-white text-black hover:bg-neutral-300 rounded-2xl px-6 py-3">
          Присоединиться
        </Button>
        <Button className="bg-white text-black hover:bg-neutral-300 rounded-2xl px-6 py-3">
          Начать игру
        </Button>
      </div>
    </div>
  );
}
