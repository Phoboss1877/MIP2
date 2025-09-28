import React, { useState, useEffect, useRef } from "react";

// Bunker Game - Single-file React component
// Tailwind CSS classes are used for styling (no imports required here).
// Default export a React component ready to paste into a Create React App / Vite + React project
// Designed as a monochrome (black & white) UI with accessible controls and simple local game logic.

export default function BunkerApp() {
  // app states
  const [page, setPage] = useState("home"); // home | lobby | game | rules
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);
  const [isLeader, setIsLeader] = useState(false);
  const [roundTime, setRoundTime] = useState(60); // seconds
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);
  const [log, setLog] = useState([]);
  const [roleView, setRoleView] = useState({}); // { playerName: role }
  const [cards, setCards] = useState([]); // example card stack
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [voteResults, setVoteResults] = useState({});

  // Helper: add a log entry
  function pushLog(text) {
    setLog((s) => [{ id: Date.now(), text }, ...s].slice(0, 50));
  }

  // Mock function to 'create' a lobby locally
  function createLobby() {
    if (!name.trim()) return;
    setPlayers([{ id: 1, name }]);
    setIsLeader(true);
    setPage("lobby");
    pushLog(`${name} created the bunker.`);
  }

  // Mock 'join' lobby
  function joinLobby() {
    if (!name.trim()) return;
    setPlayers((p) => [...p, { id: Date.now(), name }]);
    setPage("lobby");
    pushLog(`${name} joined the bunker.`);
  }

  // Start game locally: assign simple roles and prepare cards
  function startGame() {
    if (players.length < 2) {
      pushLog("Нужно как минимум 2 игрока для начала.");
      return;
    }

    // example roles distribution
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    const roles = ["Выживший", "Шпион", "Медик", "Стрелок"];
    const assigned = {};
    shuffled.forEach((p, i) => {
      assigned[p.name] = roles[i % roles.length];
    });
    setRoleView(assigned);

    // prepare deck (simple text cards)
    const deck = [
      "Запасы воды",
      "Ремонт оборудования",
      "Поиск медикаментов",
      "Нападение на вход",
      "Починка датчика",
      "Тихая патруль",
    ].sort(() => Math.random() - 0.5);
    setCards(deck);

    setPage("game");
    setIsLeader(false);
    pushLog("Игра началась. Роли распределены.");
    // show each player their role briefly (in a real game you'd send privately)
  }

  // Timer controls
  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            setRunning(false);
            pushLog("Раунд завершён.");
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  function beginRound() {
    setTimeLeft(roundTime);
    setRunning(true);
    pushLog("Раунд начат.");
  }

  function endRoundEarly() {
    clearInterval(timerRef.current);
    setRunning(false);
    setTimeLeft(0);
    pushLog("Раунд прекращён ведущим.");
  }

  // Example: play top card
  function playCard() {
    if (!cards.length) {
      pushLog("Колода пуста.");
      return;
    }
    const top = cards[0];
    setCards((c) => c.slice(1));
    pushLog(`Игрок берёт карту: ${top}`);
  }

  // Voting stub
  function voteFor(playerName) {
    setVoteResults((v) => ({ ...v, [playerName]: (v[playerName] || 0) + 1 }));
    pushLog(`${name || 'Игрок'} проголосовал за ${playerName}`);
  }

  // UI components inline
  const Header = () => (
    <header className="w-full border-b border-black/30 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-black text-black font-bold">B</div>
        <h1 className="text-lg font-semibold">Бункер — Чёрно/белая версия</h1>
      </div>
      <nav className="flex gap-3">
        <button className="px-3 py-1 rounded focus:outline-none focus:ring" onClick={() => setPage("home")}>Главная</button>
        <button className="px-3 py-1 rounded focus:outline-none focus:ring" onClick={() => setPage("rules")}>Правила</button>
      </nav>
    </header>
  );

  // MINIMAL accessible button style
  const ActionButton = ({ children, onClick, small }) => (
    <button
      onClick={onClick}
      className={`border border-black px-4 py-${small ? "1" : "2"} rounded shadow-sm hover:brightness-95 active:translate-y-0.5 focus:outline-none focus:ring`}
    >
      {children}
    </button>
  );

  // Pages
  function Home() {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Добро пожаловать в Бункер</h2>
          <p className="text-sm text-black/70">Локальная демо-версия. Чёрно-белая стилистика, фокус на читабельности и контрасте.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-black p-4 rounded-lg bg-white/95">
            <label className="block text-xs mb-2">Ваше имя</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-black rounded bg-white text-black"
              placeholder="Например: Анна"
            />

            <div className="mt-4 flex gap-3">
              <ActionButton onClick={createLobby}>Создать бункер</ActionButton>
              <ActionButton onClick={joinLobby}>Присоединиться</ActionButton>
            </div>

            <div className="mt-4 text-xs text-black/70">
              <p>Создавайте локальную комнату для друзей. Это демо — для реальной многопользовательской игры нужно подключить сервер.</p>
            </div>
          </div>

          <div className="border border-black p-4 rounded-lg bg-white/95">
            <h3 className="font-semibold mb-2">Быстрый старт</h3>
            <ol className="list-decimal pl-5 text-sm text-black/80">
              <li>Создайте или присоединитесь к бункеру.</li>
              <li>Добавьте минимум 2 игроков.</li>
              <li>Ведущий нажимает «Начать игру».</li>
            </ol>

            <div className="mt-4">
              <ActionButton onClick={() => setPage("rules")}>О правилах</ActionButton>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h3 className="font-semibold mb-2">Журнал событий</h3>
          <div className="max-h-40 overflow-auto border border-black p-2 rounded bg-white/95">
            {log.length === 0 ? <p className="text-sm text-black/60">Пусто</p> : (
              <ul className="text-sm">
                {log.map((l) => <li key={l.id} className="py-1">{l.text}</li>)}
              </ul>
            )}
          </div>
        </section>
      </main>
    );
  }

  function Lobby() {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <section className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Лобби</h2>
          {isLeader && <div className="text-sm">Вы — ведущий</div>}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2 border border-black p-4 rounded bg-white/95">
            <h3 className="font-semibold mb-2">Игроки</h3>
            <ul className="text-sm">
              {players.map((p) => (
                <li key={p.id} className="py-1 flex items-center justify-between">
                  <span>{p.name}</span>
                  <span className="text-xs text-black/60">id: {p.id}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex gap-3">
              {isLeader ? (
                <>
                  <ActionButton onClick={startGame}>Начать игру</ActionButton>
                  <ActionButton onClick={() => { setPlayers([]); setPage('home'); pushLog('Лобби закрыто.'); }}>Закрыть лобби</ActionButton>
                </>
              ) : (
                <ActionButton onClick={() => setIsLeader(true)}>Стать ведущим</ActionButton>
              )}
            </div>
          </div>

          <div className="border border-black p-4 rounded bg-white/95">
            <h3 className="font-semibold mb-2">Настройки раунда</h3>
            <label className="block text-xs">Длительность (сек)</label>
            <input type="number" value={roundTime} onChange={(e) => setRoundTime(Number(e.target.value))} className="w-full p-2 border border-black rounded mt-2 bg-white text-black" />
            <div className="mt-3 text-sm text-black/70">Настройки применяются при старте игры.</div>
          </div>
        </section>
      </main>
    );
  }

  function Game() {
    return (
      <main className="p-6 max-w-6xl mx-auto">
        <section className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Игра — Раунд</h2>
          <div className="flex items-center gap-3">
            <div className="text-sm">Время: <strong>{timeLeft}s</strong></div>
            {!running ? (
              <ActionButton onClick={beginRound}>Старт раунда</ActionButton>
            ) : (
              <ActionButton onClick={endRoundEarly}>Завершить</ActionButton>
            )}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2 border border-black p-4 rounded bg-white/95">
            <h3 className="font-semibold mb-2">Действия</h3>

            <div className="flex gap-3 flex-wrap">
              <ActionButton onClick={playCard}>Играть карту</ActionButton>
              <ActionButton onClick={() => pushLog('Осмотр территории...')}>Осмотреть</ActionButton>
              <ActionButton onClick={() => voteFor(prompt('За кого голосуете?') || 'Никто')}>Голосовать</ActionButton>
            </div>

            <div className="mt-4">
              <h4 className="font-medium">Колода ({cards.length})</h4>
              <div className="mt-2 max-h-40 overflow-auto border border-black p-2 rounded bg-white/98 text-sm">
                {cards.length === 0 ? <p className="text-black/60">Пусто</p> : (
                  <ol className="list-decimal pl-5">
                    {cards.map((c, i) => <li key={i} className="py-1">{c}</li>)}
                  </ol>
                )}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-medium">Роли (демо — видны всем)</h4>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                {Object.entries(roleView).map(([p, r]) => (
                  <div key={p} className="border border-black p-2 rounded flex items-center justify-between bg-white/95">
                    <span>{p}</span>
                    <span className="text-xs text-black/60">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="border border-black p-4 rounded bg-white/95">
            <h3 className="font-semibold mb-2">Журнал и голосование</h3>
            <div className="max-h-48 overflow-auto text-sm">
              {log.length === 0 ? <p className="text-black/60">Пусто</p> : (
                <ul>
                  {log.map(l => <li key={l.id} className="py-1">{l.text}</li>)}
                </ul>
              )}
            </div>

            <div className="mt-4">
              <h4 className="font-medium">Результаты голосования</h4>
              <div className="mt-2 text-sm">
                {Object.keys(voteResults).length === 0 ? <p className="text-black/60">Нет голосов</p> : (
                  <ul>
                    {Object.entries(voteResults).map(([k, v]) => <li key={k}>{k}: {v}</li>)}
                  </ul>
                )}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-6">
          <ActionButton onClick={() => { setPage('home'); pushLog('Игра окончена.'); }}>Выйти в меню</ActionButton>
        </section>
      </main>
    );
  }

  function Rules() {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-3">Правила — Коротко</h2>
        <ol className="list-decimal pl-5 text-sm text-black/90">
          <li>Создайте комнату и добавьте игроков.</li>
          <li>Ведущий распределяет роли (в реальной игре — приватно).</li>
          <li>Раунды идут по таймеру: обсуждение, действия, голосование.</li>
          <li>Карты/события влияют на шансы выживания группы.</li>
          <li>Цель — сохранить как можно больше выживших или выполнить задания.</li>
        </ol>

        <div className="mt-4">
          <ActionButton onClick={() => setPage('home')}>Назад</ActionButton>
        </div>
      </main>
    );
  }

  // Main render
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="p-6">
          {/* subtle framed container to emphasize monochrome */}
          <div className="border-2 border-white/10 rounded-lg overflow-hidden" style={{ background: '#fff', color: '#000' }}>
            {/* inner area uses black-on-white for content (paper-like) */}
            <div style={{ background: '#fff', color: '#000' }}>
              {page === 'home' && <Home />}
              {page === 'lobby' && <Lobby />}
              {page === 'game' && <Game />}
              {page === 'rules' && <Rules />}
            </div>
          </div>
        </div>

        <footer className="p-4 text-center text-xs text-black/60">
          © 2025 — Бункер (демо). Дизайн: чёрно/белый UI — высокий контраст для удобства чтения.
        </footer>
      </div>
    </div>
  );
}
