import { GameState } from "../../types";

export const getPlayersList = (G: GameState) => Object.keys(G.players).map(playerId => G.players[playerId]);

export const getRandomPlayerName = () => {
  const prefixes = [
    "Neo", "Vara", "Khy", "Atre", "Spect", "Tyr", "Eido", "Rha", "Quor", "Xen", "Ghos", "Laz", "Arka", "Ser", "Voigt", "Plas"
  ];

  const cores = [
    "runner", "dune", "geist", "nova", "spire", "void", "katra", "syn", "korr", "tek", "mancer", "neon", "lab", "flux", "forge"
  ];

  const suffixes = [
    "Corp", "Industries", "Dynasty", "Unit", "Division", "Collective", "Systems", "Syndicate", "Temple", "Array", "Protocol", "Order"
  ];

  const personFirst = [
    "Deck", "Rhae", "Nyx", "Kael", "Orrin", "Speng", "Yara", "Leto", "Vex", "Elara", "Ion", "Cen", "Ridd", "Juno", "Zhar"
  ];

  const personLast = [
    "Atreid", "Tyrell", "Gozer", "Vorn", "Specter", "Kade", "Myra", "Blade", "Renne", "Ghost", "Nexus", "Tarn", "Volt", "Sand", "Phase"
  ];

  const modes = ["entity", "person", "corporation"];
  const mode = modes[Math.floor(Math.random() * modes.length)];

  if (mode === "person") {
    return `${personFirst[Math.floor(Math.random() * personFirst.length)]} ${personLast[Math.floor(Math.random() * personLast.length)]}`;
  }

  if (mode === "corporation") {
    return `${prefixes[Math.floor(Math.random() * prefixes.length)]}${cores[Math.floor(Math.random() * cores.length)]} ${suffixes[Math.floor(Math.random() * suffixes.length)]}`;
  }

  // entity or concept style
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]}${cores[Math.floor(Math.random() * cores.length)]}`;
}
