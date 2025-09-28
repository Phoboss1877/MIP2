import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function BunkerGameUI() {
  const [character, setCharacter] = useState(null);

  const generateCharacter = () => {
    // Тут мы просто эмулируем генерацию характеристик, как в твоём Python коде
    const ageNum = Math.floor(Math.random() * 70) + 16;
    const age = ageNum <= 34 ? `${ageNum} (Молодой)` : ageNum <= 59 ? `${ageNum} (Взрослый)` : `${ageNum} (Пожилой)`;

    const genders = ["Мужской", "Женский", "Мужской (Чайлдфри)", "Женский (Чайлдфри)"];
    const gender = genders[Math.floor(Math.random() * genders.length)];

    const bodyTypes = ["Хрупкое", "Худое", "Атлетическое", "Крепкое", "Полное", "Ожирение-слабое", "Ожирение-сильное"];
    const body = bodyTypes[Math.floor(Math.random() * bodyTypes.length)];

    const traits = ["Самовлюблённый", "Трудолюбивый", "Общительный", "Жизнерадостный", "Импульсивный"];
    const trait = traits[Math.floor(Math.random() * traits.length)];

    const professions = ["Программист", "Повар", "Доктор", "Военный", "Стример"];
    const prof = professions[Math.floor(Math.random() * professions.length)];

    const experience = ["Новичок", "Опытный", "Профессионал"];
    const exp = experience[Math.floor(Math.random() * experience.length)];

    const diseases = ["Здоров", "Аллергия", "Астма", "Диабет", "Шизофрения"];
    const disease = diseases[Math.floor(Math.random() * diseases.length)];

    const items = ["Аптечка", "Гитара", "Консервы", "Радио", "Топор и верёвка"];
    const item = items[Math.floor(Math.random() * items.length)];

    const facts = ["Был(а) вожатым", "Знает 4 языка", "Играл в театре", "Побывал в 10 странах"];
    const fact = facts[Math.floor(Math.random() * facts.length)];

    const phobias = ["Нет фобий", "Боязнь темноты", "Клаустрофобия"];
    const phobia = phobias[Math.floor(Math.random() * phobias.length)];

    const hobbies = ["Чтение", "Охота", "Рыбалка", "Спорт"];
    const hobby = hobbies[Math.floor(Math.random() * hobbies.length)];

    setCharacter({ age, gender, body, trait, prof, exp, disease, item, fact, phobia, hobby });
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold tracking-widest mb-8"
      >
        БУНКЕР
      </motion.h1>

      {!character ? (
        <Button onClick={generateCharacter} className="bg-white text-black hover:bg-neutral-300 rounded-2xl px-6 py-3">
          Сгенерировать персонажа
        </Button>
      ) : (
        <Card className="bg-neutral-900 border border-neutral-700 rounded-2xl shadow-lg max-w-lg w-full">
          <CardContent className="p-6 space-y-3">
            <p><b>Возраст:</b> {character.age}</p>
            <p><b>Пол:</b> {character.gender}</p>
            <p><b>Телосложение:</b> {character.body}</p>
            <p><b>Черта характера:</b> {character.trait}</p>
            <p><b>Профессия:</b> {character.prof} ({character.exp})</p>
            <p><b>Заболевания:</b> {character.disease}</p>
            <p><b>Предмет:</b> {character.item}</p>
            <p><b>Факт:</b> {character.fact}</p>
            <p><b>Фобия:</b> {character.phobia}</p>
            <p><b>Хобби:</b> {character.hobby}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
