import { useState } from "react";
import { Lobby } from "./components/Lobby";
import { Game } from "./components/Game";
import "./App.css";

export default function App() {
  const [gameId, setGameId] = useState<string|null>(null);
  return <div className="flex justify-center m-auto my-4">
    {/* gameId ? <Game gameId={gameId} /> : <Lobby onGameJoin={setGameId} /> */}
    <Game gameId="123" />
  </div>;
}
