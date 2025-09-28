function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function generateCharacter() {
  const genderList = ['Мужской', 'Женский', 'Мужской (Чайлдфри)', 'Женский (Чайлдфри)'];
  const bodyTypes = ['Хрупкое', 'Худое', 'Атлетическое', 'Крепкое', 'Полное', 'Ожирение-слабое', 'Ожирение-сильное'];
  const traits = ['Самовлюблённый', "Трудолюбивый", "Общительный", "Беспринципный", "Жизнерадостный"];
  const professions = ['Программист', 'Учитель', 'Повар', 'Военный', 'Инженер'];
  const experiences = ['Новичёк', 'Любитель', 'Профессионал'];
  const diseases = ['Здоров', 'Аллергия', 'Астма', 'Депрессия', 'ВИЧ'];
  const items = ['Аптечка', 'Гитара', 'Консервы', 'Лук и стрелы'];
  const characters = ['Авантюризм', 'Доброта', 'Храбрость', 'Грубость'];
  const facts = ['Был вожатым', 'Проходил курсы массажа', 'Побывал в 10 странах'];
  const phobias = ['Клаустрофобия', 'Нет фобий', 'Арахнофобия'];
  const hobbies = ['Чтение', 'Рыбалка', 'Игра в футбол', 'Кулинария'];

  const ageRaw = Math.floor(Math.random() * (85 - 16 + 1)) + 16;
  let ageLabel = ageRaw + " (";
  if (ageRaw <= 34) ageLabel += "Молодой)";
  else if (ageRaw <= 59) ageLabel += "Взрослый)";
  else ageLabel += "Пожилой)";

  const height = Math.floor(Math.random() * (200 - 149 + 1)) + 149;

  const output = `
==============================================
ХАРАКТЕРИСТИКИ ПЕРСОНАЖА
==============================================
Возраст:  ${ageLabel}
Рост:  ${height}
Пол:  ${randomItem(genderList)}
Телосложение:  ${randomItem(bodyTypes)}
Черта характера:  ${randomItem(traits)}
Профессия:  ${randomItem(professions)} (${randomItem(experiences)})
Заболевания:  ${randomItem(diseases)}
Предметы:  ${randomItem(items)}
Доп. черта:  ${randomItem(characters)}
Факт:  ${randomItem(facts)}
Фобия:  ${randomItem(phobias)}
Хобби:  ${randomItem(hobbies)}
==============================================
`;

  document.getElementById('output').textContent = output;
}
