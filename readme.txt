# 🪐 DUNE & PORRO — Worker Placement Engine (MVP)

## 🧭 Descripción general

Este proyecto busca **traducir el juego de mesa *Dune Imperium + Rise of Ix* a una versión web multijugador**, con foco inicial en desarrollar un **motor modular de lógica de juego**.

El objetivo del primer hito (**MVP 1**) es construir los cimientos del motor de *worker placement* y gestión de recursos, estableciendo un flujo completo de turno y ronda, reglas de validación y persistencia del estado de juego.

El proyecto está desarrollado en **React + boardgame.io + socket.io**, con arquitectura modular escalable para incorporar fases, mecánicas y expansiones en el futuro.

---

## 🎯 Alcance del MVP 1

El primer hito incluye solo las mecánicas fundamentales para permitir partidas funcionales en red local (LAN):

### Módulos activos:
- **Motor de Worker Placement**:
  - Colocación de agentes en espacios de acción.
  - Validaciones de disponibilidad, coste y condiciones.
  - Ocupación de casillas y bloqueo de espacios.
- **Motor de Recursos**:
  - Pago de costes (agua, especia, solari).
  - Cobro de recompensas del espacio.
- **Turnos y Rondas**:
  - Fases completas: `RoundStart → AgentTurns → Combat → Makers → Return`.
  - Flujo entre turnos de jugador, finalización de turno, y paso de ronda.
- **Combate básico**:
  - Despliegue de tropas al conflicto.
  - Cálculo de fuerza de combate.
  - Resolución y entrega de recompensas al ganador.
- **Persistencia de estado**:
  - Sincronización en tiempo real vía `socket.io`.
  - Posibilidad de reconexión y persistencia local del estado de partida.
- **UI React minimalista**:
  - Tablero interactivo con espacios de acción.
  - Panel de jugador con recursos, agentes y tropas.
  - Visualización del estado global del conflicto.

### Módulos excluidos del MVP 1:
- Deckbuilding (cartas, mercado, compra de cartas).
- Mercado de tecnologías.
- Cartas de intriga.
- Trackers de facciones y anillo.
- Efectos avanzados de expansión (*Rise of Ix*).

---

## ⚙️ Arquitectura técnica

### Estructura general
