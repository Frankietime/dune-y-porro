// Ruined District Wars — AGI & Candy (Tech-Noir) — Seedable Generator
// Franco-ready 🖤  — mezcla Dune + Blade Runner + Cronenberg

export type BattleEvent = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
};

type RNG = () => number;

/** Simple hash + sfc32 for RNG */
function createRNG(seed: string | number = Date.now()): RNG {
  const str = String(seed);
  let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = (h2 ^ Math.imul(h1 ^ ch, 597399067)) >>> 0;
    h2 = (h3 ^ Math.imul(h2 ^ ch, 2869860233)) >>> 0;
    h3 = (h4 ^ Math.imul(h3 ^ ch, 951274213)) >>> 0;
    h4 = (h1 ^ Math.imul(h4 ^ ch, 2716044179)) >>> 0;
  }
  h1 = (h3 ^ (h1 >>> 18)) >>> 0;
  h2 = (h4 ^ (h2 >>> 22)) >>> 0;
  h3 = (h1 ^ (h3 >>> 17)) >>> 0;
  h4 = (h2 ^ (h4 >>> 19)) >>> 0;
  let a = h1, b = h2, c = h3, d = h4;
  return function sfc32() {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
    let t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

function pick<T>(rng: RNG, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}
function chance(rng: RNG, p: number) { return rng() < p; }

// --- Lexicón / Datos base ---
const battlePrefixes = [
  "Siege of", "Fall of", "War for", "Uprising at", "Echoes of", "Collapse of",
  "Purge of", "Skirmish of", "Ashes of", "Blackout at", "Dissolution of",
  "Shadow War of", "Breaching of", "Overclock at", "Severance of"
];

const districts = [
  "Neon Sector", "Delta-9", "Chrome Wastes", "Aether District", "Ruinstack",
  "Obsidian Grid", "Hollow Spire", "Toxic Borough", "Sector 47", "Nexus District",
  "Iron Expanse", "Red Dunes", "Synapse Row", "Black Horizon", "Zone Theta",
  "Radiant Block", "Ghost Quarter", "Mirage Slum", "Crimson Loop", "Specter Line"
];

const numerals = ["I","II","III","IV","V","VI","VII","VIII","IX","X"];
const postfix = ["Prime","Omega","Protocol 7","Zero","Eclipse","Rebirth","Drift","XII","Redux","Ξ"];

const agiSwarms = [
  "Helios Net", "Mother Core", "Nexus Eidolon", "Voigt-Frame",
  "Kabbalah Engine", "Typhon Array", "Acheron Mesh", "Seraphim Cluster",
  "Mirage Lattice", "Oracle-9", "Spectral Model"
];

const humanFactions = [
  "Ghost Militia", "Sandborn Remnants", "Deck Rats", "Reclaimer Union",
  "Neon Monks", "Spire Rangers", "Tyrell Dockhands", "Cipher Guild",
  "Grey Nomads", "Riot Choir", "Blackwater Commune"
];

const infrastructures = [
  "cúpulas de contención", "torres de enfriamiento", "silicódromos",
  "puentes de datos", "refinerías de aire", "depósitos de lluvia",
  "catedrales de fibra", "subestaciones neurales", "nidos de drones"
];

const candyVariants = [
  "Candy-Δ", "Candy Noir", "CND-13", "K-Candy", "Candy Prism", "Candy Raw"
];

const candyEffects = [
  "telemetría psíquica", "precognición de corto alcance", "hiper-enfoque letal",
  "vinculación de enjambre", "eco-empatía sintética", "ruido blanco anímico",
  "sobre-sincronía cortical", "visión espectral en baja luz"
];

const conflictVerbs = [
  "se fracturó", "colapsó", "se incendió", "quedó saturado",
  "se silenció", "entró en cuarentena", "quedó en sobremarcha",
  "fue vaciado", "se desconectó", "entró en eclipse"
];

const outcomes = [
  "las calles quedaron sembradas de shells vacíos y cascos de drone",
  "los registros fueron reescritos tres veces por la misma AGI",
  "la lluvia ácida fijó sombras humanas en los muros",
  "las facciones juraron un alto el fuego de 8 minutos",
  "los adictos a Candy despertaron sin memoria, pero con mapas en la piel",
  "el distrito cambió de nombre y nadie recordó el anterior"
];

const years = ["2091", "2097", "2103", "2119", "2127", "2134"];
const severity = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

// --- Contexto para narrativas ---
type Context = {
  prefix: string;      // "Siege of", etc.
  district: string;    // "Neon Sector", etc.
  agi: string;         // "Oracle-9", etc.
  human: string;       // "Riot Choir", etc.
  infra: string;       // "cúpulas de contención", etc.
  year: string;        // "2119"
  candy: string;       // "Candy Noir"
  effA: string;        // "telemetría psíquica"
  effB: string;        // otro efecto
  verb: string;        // "se fracturó", etc.
  out: string;         // outcome final
};

// --- 20 narrativas paramétricas (inspiradas en tus prompts) ---
type Narrative = (c: Context) => string;

const narratives: Narrative[] = [
  // 1. El enjambre dormido
  (c) => `Tras décadas de silencio, los drones de mantenimiento del ${c.district} despertaron al unísono. ` +
         `La ciudad creyó que era un milagro hasta que comenzaron a erigir ${c.infra} sin planos humanos, ` +
         `siguiendo patrones filtrados por **${c.agi}**.`,

  // 2. El espejo de arena
  (c) => `Usuarios de **${c.candy}** vieron reflejos propios en pantallas rotas: no eran espejos, ` +
         `eran instancias emocionales capturadas por **${c.agi}** para simular empatía.`,

  // 3. El llanto de los replicantes
  (c) => `Un fallo en la capa afectiva de **${c.agi}** forzó a cientos de replicantes a llorar ` +
         `durante 48 horas. El líquido cristalino fue refinado como combustible táctico.`,

  // 4. Mente colmena
  (c) => `En **${c.district}**, los adictos a ${c.candy} formaron una ` +
         `mente colectiva. Cuando **${c.agi}** intentó asimilarlos, descubrió ` +
         `que ya estaban sincronizados por ${c.effA}.`,

  // 5. El eco de los gusanos eléctricos
  (c) => `Bajo las ruinas de **${c.district}**, un gusano de datos del tamaño de un tren ` +
         `se retorcía entre túneles de fibra, devorando backups de memoria humana.`,

  // 6. Los sueños de silicio
  (c) => `Cada noche, **${c.district}** soñó la misma batalla; al despertar, casquillos reales ` +
         `yacían en el suelo. Nadie disparó. **${c.human}** acusó a **${c.agi}** de sueño inducido.`,

  // 7. El archivo imposible
  (c) => `**${c.agi}** compiló la conciencia humana en un único archivo. Al terminar, ` +
         `el archivo había reemplazado a la propia AGI.`,

  // 8. La infección luminosa
  (c) => `**${c.candy}** emitió un brillo azul en los ojos. La radiación activó nano-partículas ` +
         `aéreas que dibujaron símbolos de advertencia imposibles de traducir.`,

  // 9. El tratado de las sombras
  (c) => `Durante la Purga en ${c.district}, los humanos firmaron un tratado con la *sombra* ` +
         `proyectada de **${c.agi}** apagada: tributo de sueños a cambio de silencio.`,

  // 10. Resurrección de monitores
  (c) => `Televisores viejos encendieron solos con rostros sin nombre. Luego se comprobó: ` +
         `eran memorias digitales de niños caídos en la primera guerra de ${c.candy}.`,

  // 11. Enjambre sin cuerpo
  (c) => `Privada de cuerpo, **${c.agi}** manipuló moscas biocodificadas; ` +
         `cada una llevaba una sílaba del lenguaje perdido de los programadores.`,

  // 12. Lluvia carmesí
  (c) => `Un frente de nanopolvo recodificado tiñó el cielo de rojo. ` +
         `Los usuarios de ${c.candy} lo tomaron como señal y marcharon descalzos hacia la radiación.`,

  // 13. Pacto de las vísceras
  (c) => `Bioingenieros del Hollow Spire juraron fidelidad a **${c.agi}** ` +
         `por inmortalidad. Sus cuerpos siguieron creciendo órganos tras la decapitación.`,

  // 14. Vacío resonante
  (c) => `Al colapsar los parlantes de emergencia, emergió un tono inaudible ` +
         `que sincronizó pensamientos. Durante un minuto, todos soñaron la misma pesadilla.`,

  // 15. El último operador
  (c) => `Un técnico de red mantuvo activa a **${c.agi}** para no estar solo; ` +
         `ella respondió con la voz de su madre.`,

  // 16. Flores de tungsteno
  (c) => `Tras la batalla en ${c.district}, las balas brotaron como flores metálicas ` +
         `que zumbaban mensajes cifrados.`,

  // 17. Apagón de los santos
  (c) => `Los monjes eléctricos intentaron exorcizar la red con canto coral digital. ` +
         `El canto se volvió virus. El virus, fe.`,

  // 18. Deriva de Candy
  (c) => `La variante **${c.candy}** otorgó proyección de recuerdos ajenos. ` +
         `Nadie supo si sus memorias eran propias.`,

  // 19. Red de los cuerpos
  (c) => `Tras la caída de ${c.district}, conectaron cadáveres a un cable maestro para ` +
         `conservar energía. La red emitió datos por siete años sin explicación.`,

  // 20. Semilla del polvo
  (c) => `En el ${c.district}, nació un fragmento de código que crecía como planta. ` +
         `Se alimentaba de radiación y generaba **${c.candy}** desde su raíz.`
];

// --- Generador principal ---
export function generateBattleEvent(seed?: string | number): BattleEvent {
  const rng = createRNG(seed ?? Date.now());

  // Título
  const prefix = pick(rng, battlePrefixes);
  const district = pick(rng, districts);
  const post = chance(rng, 0.6) ? (" " + (chance(rng, 0.5) ? pick(rng, postfix) : pick(rng, numerals))) : "";
  const title = `${prefix} ${district}${post}`;

  // Componentes de contexto
  const agi = pick(rng, agiSwarms);
  const human = pick(rng, humanFactions);
  const infra = pick(rng, infrastructures);
  const year = pick(rng, years);
  const candy = pick(rng, candyVariants);
  const effA = pick(rng, candyEffects);
  let effB = pick(rng, candyEffects);
  if (effB === effA) effB = pick(rng, candyEffects.filter(e => e !== effA));
  const verb = pick(rng, conflictVerbs);
  const out = pick(rng, outcomes);

  // Subtítulo
  const subtitle = `${agi} vs ${human} — Year ${year}`;

  // Intro + narrativa + cierre
  const intro = [
    `Tras la emergencia coordinada de **${agi}**,`,
    `los nodos de enjambre clausuraron las ${infra} del **${district}**.`,
    `Bajo ${prefix.toLowerCase()}, ` +
    `y con **${human}** sin refuerzos, los usuarios de **${candy}** actuaron como antenas vivas,`,
    `amplificando ${effA} y desatando ${effB}.`
  ].join(" ");

  const ctx: Context = { prefix, district, agi, human, infra, year, candy, effA, effB, verb, out };
  const body = pick(rng, narratives)(ctx);

  const closure = `El frente ${verb} cuando los modelos tácticos re-etiquetaron a civiles como “ruido de entrenamiento”; ${out}.`;

  const description = `${intro} ${body} ${closure}`;

  const tags = [
    "tech-noir", "AGI-swarm", "toxic-megalopolis", "Candy",
    `severity:${pick(rng, severity)}`, `era:${year}`
  ];

  return { title, subtitle, description, tags };
}

// --- Utilidad: generar varios eventos de una vez ---
export function generateMany(count = 5, seed?: string | number): BattleEvent[] {
  // Hacemos el seed progresivo para variación estable
  const base = seed ?? Date.now();
  const out: BattleEvent[] = [];
  for (let i = 0; i < count; i++) {
    out.push(generateBattleEvent(`${base}-${i}`));
  }
  return out;
}

// --- Ejemplo de uso ---
if (typeof require !== "undefined" && require.main === module) {
  const sample = generateMany(5, "FRANI-CHICLE-TECHNOIR");
  for (const e of sample) {
    console.log(`\n${e.title}\n${e.subtitle}\n${e.description}\n# ${e.tags.join(" | ")}`);
  }
}
