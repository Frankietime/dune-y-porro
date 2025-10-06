import { useEffect, useMemo, useRef, useState } from "react";
import { socket } from "../socket";
import { useGame } from "../store";
import { notify } from "../notifications";
import { ViewportComponent } from "./viewport-component/ViewPortComponent";

export const MainComponent = () => {
  const { me, roomId, state, setMe, setRoomId, setState, setPlayer } = useGame();
  const [name, setName] = useState("Player");
  const [room, setRoom] = useState("demo");
  const prevTurnRef = useRef<number | null>(null);

  // Conecta eventos
  useEffect(() => {
    const onState = (s: any) => {
        console.log("[client] STATE RX:", s);
        setState(s);
        // Notifica si cambió el turno
        if (prevTurnRef.current !== null && prevTurnRef.current !== s.turnIndex) {
        const current = s.players[s.turnIndex];
        notify("Cambio de turno", `Ahora juega: ${current?.name ?? "?"}`);
        }
        prevTurnRef.current = s.turnIndex;
    };
    socket.on("state", onState);
    socket.on("connect", () => console.log("[client] WS CONNECT", socket.id));
    socket.on("connect_error", (e) => console.log("[client] WS ERROR", e.message));
    return () => {
      socket.off("state", onState);
    };
  }, [setState]);

  const currentPlayer = useMemo(
    () => (state && state.players.length ? state.players[state.turnIndex] : undefined),
    [state]
  );

  const imCurrent = me && currentPlayer && me.id === currentPlayer.id;

  // Sincroniza tu "me" local cuando el server actualiza
  useEffect(() => {
    if (!state || !me) return;
    const updated = state.players.find((p) => p.id === me.id);
    if (updated && (updated.name !== me.name || updated.score !== me.score)) {
      useGame.setState({ me: updated });
    }

    if (state?.players?.filter((p) => p.id === socket.id)[0])
        setPlayer(state?.players?.filter((p) => p.id === socket.id)[0]);
  }, [state, me]);

  const join = () => {
    setRoomId(room);
    socket.emit("joinRoom", { roomId: room, playerName: name });
    // set "me" local con el id de socket (llega justo después)
    setTimeout(() => {
      // socket.id está disponible tras conectar/emitir
      setMe({ id: socket.id, name, score: 0 });
      socket.emit("sync", { roomId: room });
    }, 200);
  };

  const move = () => {
    if (!roomId) return;
    socket.emit("makeMove", { roomId });
  };
  const endTurn = () => {
    if (!roomId) return;
    socket.emit("endTurn", { roomId });
  };

  return (
    <div style={{ padding: 16, maxWidth: "90%" }}>
      <div className="nes-container with-title is-centered">
        <h1 className="title">DUNE & PORRO</h1>
        <h2>SPICE MUST FLOW</h2>
        {!state && (
        <div style={{ display: "grid", gap: 8, maxWidth: 360 }}>
          <label>
            Nombre
            <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: "100%" }} />
          </label>
          <label>
            Sala
            <input value={room} onChange={(e) => setRoom(e.target.value)} style={{ width: "100%" }} />
          </label>
          <button onClick={join} style={{ padding: "8px 12px" }}>Entrar</button>
          <p style={{ fontSize: 12, opacity: 0.7 }}>
            Otros en tu LAN abren: <code>http://{window.location.hostname}:5173</code>
          </p>
        </div>
      )}
      {state && (
        <>
          <ViewportComponent
            enabled={imCurrent!}
          />
          {/* <div style={{ marginTop: 12, padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Sala:</strong> <span>{state.id}</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <strong>Jugadores:</strong>
              <ul>
                {state.players.map((p, i) => (
                  <li key={p.id}>
                    {i === state.turnIndex ? "👉 " : ""}
                    {p.name} — puntos: {p.score} {p.id === me?.id ? "(vos)" : ""}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={move} disabled={!imCurrent} style={{ padding: "8px 12px" }}>
                Hacer jugada (+1)
              </button>
              <button onClick={endTurn} disabled={!imCurrent} style={{ padding: "8px 12px" }}>
                Pasar turno
              </button>
            </div>
            {!imCurrent && <p style={{ marginTop: 8 }}>Esperando tu turno…</p>}
          </div> */}
        </>
      )}
      </div>
    </div>
  );
}