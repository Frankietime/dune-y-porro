import { useEffect, useState } from 'react';
import { LobbyAPI } from 'boardgame.io';
import { useAppStore } from '../../store';
import { useLobbyStore } from './store';
import { useLobbyServices } from '../services/lobbyServices';
import { BACKEND_URL } from '../../config';


export const LobbyComponent = () => {

  const {
    createMatch,
    getMatch,
    joinMatch,
    listMatches, 
    leaveMatch
  } = useLobbyServices();

  const {
    playerProps,
    setPlayerProps
  } = useAppStore();

  const {
    setMatchName,
    matchName,
    
    matchList,
    setMatchList
  } = useLobbyStore();

  // Polling
  useEffect(() => {
      const intervalId = setInterval(() => {
        listMatches()
          .then((data) => setMatchList(data))
      }, 500);
      return () => clearInterval(intervalId);
  }, []);

  const onCreateMatch = async () => {
    return await createMatch(
      2, 
      {
        name: useLobbyStore.getState().matchName, 
        playerName: useAppStore.getState().playerProps.name
      }       
    ).then((res) =>  res);
  }

  const onJoinMatch = async (matchID: string) => {
    const { playerCredentials, playerID } = await joinMatch(
      matchID,
      {
        playerName: useAppStore.getState().playerProps.name,
      }
    );

    const match: LobbyAPI.Match = await getMatch(matchID);
    useAppStore.getState().setMatchData(match);
    
    useAppStore.getState().setPlayerProps({ 
      ...useAppStore.getState().playerProps, 
      matchID, 
      playerID, 
      playerCredentials 
    });
  }

  const isLobbyClientLoaded = () => true;

  const onRemoveMatch = async (matchID: string) => {
    await fetch(`${BACKEND_URL}/admin/matches/${matchID}`, {
      method: 'DELETE',
    });
  };

  return (
    <>
      { isLobbyClientLoaded() && (
        <div className="max-w-md mx-auto p-4">
          <h1 className="text-xl font-semibold">Lobby</h1>

          {/* Player name */}
          <div className="mt-4">
            <label htmlFor="playerName" className="text-sm">Player Name</label>
            <input
              id="playerName"
              value={playerProps.name}
              onChange={(e) => setPlayerProps({ ...playerProps, name: e.target.value })}
              className="mt-1 w-full border rounded px-2 py-1"
              placeholder="Tu nombre"
            />
          </div>

          {/* Ongoing matches */}
          <div className="mt-6">
            <h2 className="text-base font-medium">Ongoing Matches</h2>

            {matchList && matchList.matches.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {matchList.matches.map((match /*: LobbyAPI.Match */) => {
                  const players = match.players.filter(p => p.name).map(p => p.name).join(", ");
                  const emptySeats = match.players.filter(p => !p.name).length;

                  return (
                    <li key={match.matchID} className="border rounded p-3">
                      <div className="text-sm font-semibold">
                        {match.setupData?.name ?? "Unnamed match"}
                      </div>
                      <div className="text-sm text-gray-600">
                        Created by: {match.setupData?.playerName ?? "—"}
                      </div>
                      <div className="mt-1 text-sm">ID: {match.matchID}</div>
                      <div className="text-sm">Players: {players || "—"}</div>
                      <div className="text-sm">Empty seats: {emptySeats}</div>

                      <button
                        onClick={() => onJoinMatch(match.matchID)}
                        disabled={emptySeats === 0}
                        className="mt-2 w-full rounded bg-blue-600 px-3 py-1.5 text-white text-sm disabled:opacity-60"
                      >
                        Join
                      </button>
                      <button
                        onClick={() => onRemoveMatch(match.matchID)}
                        className="mt-2 w-full rounded bg-red-600 px-3 py-1.5 text-white text-sm disabled:opacity-60"
                      >
                        Remove
                      </button>

                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-gray-600">-</p>
            )}
          </div>

          {/* Create match */}
          <div className="mt-6">
            <h2 className="text-base font-medium">Create Match</h2>
            <label htmlFor="matchName" className="sr-only">Match Name</label>
            <input
              id="matchName"
              value={matchName}
              onChange={(e) => setMatchName(e.target.value)}
              className="mt-2 w-full border rounded px-2 py-1"
              placeholder="Nombre de la partida"
            />
            <button
              onClick={onCreateMatch}
              className="mt-2 w-full rounded bg-emerald-600 px-3 py-1.5 text-white text-sm"
            >
              Create Match
            </button>
          </div>
        </div>

      )}      
    </>
  );
}