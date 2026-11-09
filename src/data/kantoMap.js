// Esboço simplificado da região de Kanto (coordenadas no viewBox 800 x 640 do SVG)

export const CITIES = [
  { id: 'pallet', name: 'Pallet', x: 190, y: 470, label: [0, 28] },
  { id: 'viridian', name: 'Viridian', x: 190, y: 340, label: [-62, 6] },
  { id: 'pewter', name: 'Pewter', x: 190, y: 140, label: [-56, 6] },
  { id: 'indigo', name: 'Platô Índigo', x: 80, y: 240, label: [0, 28] },
  { id: 'cerulean', name: 'Cerulean', x: 500, y: 110, label: [62, 6] },
  { id: 'saffron', name: 'Saffron', x: 500, y: 270, label: [54, 26] },
  { id: 'celadon', name: 'Celadon', x: 340, y: 270, label: [-6, 30] },
  { id: 'lavender', name: 'Lavender', x: 660, y: 270, label: [60, 6] },
  { id: 'vermilion', name: 'Vermilion', x: 500, y: 420, label: [64, 6] },
  { id: 'fuchsia', name: 'Fuchsia', x: 380, y: 500, label: [0, 30] },
  { id: 'cinnabar', name: 'Cinnabar', x: 190, y: 590, label: [62, 6] },
]

// Rotas terrestres (traço contínuo) e marítimas (tracejado)
export const ROUTES = [
  { id: 'r1', d: 'M190 470 C 196 430, 184 380, 190 340' },
  { id: 'r2', d: 'M190 340 C 185 260, 196 210, 190 140' },
  { id: 'r22', d: 'M190 340 C 130 342, 82 320, 80 240' },
  { id: 'r3', d: 'M190 140 C 260 150, 300 92, 380 108 S 460 112, 500 110' },
  { id: 'r5', d: 'M500 110 C 494 170, 506 220, 500 270' },
  { id: 'r6', d: 'M500 270 C 506 330, 494 380, 500 420' },
  { id: 'r7', d: 'M340 270 C 400 264, 440 276, 500 270' },
  { id: 'r8', d: 'M500 270 C 560 276, 610 264, 660 270' },
  { id: 'r9', d: 'M500 110 C 600 104, 664 130, 660 270' },
  { id: 'r11', d: 'M500 420 C 580 424, 652 410, 660 270' },
  { id: 'r12', d: 'M660 270 C 690 380, 640 492, 380 500' },
  { id: 'r16', d: 'M340 270 C 280 274, 266 330, 270 400 S 320 500, 380 500' },
  { id: 'r20', d: 'M380 500 C 360 572, 280 594, 230 590', sea: true },
  { id: 'r21', d: 'M190 470 C 186 510, 194 540, 190 566', sea: true },
]

export const MOUNTAINS = [
  { x: 330, y: 112, size: 1.2, name: 'Mt. Moon' },
  { x: 358, y: 122, size: 0.8 },
  { x: 610, y: 160, size: 1 },
  { x: 632, y: 172, size: 0.7 },
  { x: 110, y: 300, size: 0.9 },
  { x: 92, y: 312, size: 0.7 },
]

export const FOREST = [
  [168, 228],
  [182, 214],
  [198, 230],
  [212, 216],
  [176, 248],
  [206, 252],
]

// Onde cada treinador foi encontrado. dx desloca o alfinete quando dois dividem a mesma cidade.
export const TRAINER_SPOTS = {
  Ash: { city: 'pallet', dx: -34, place: 'Cidade natal, em Pallet' },
  Gary: { city: 'pallet', dx: 34, place: 'Laboratório do Prof. Carvalho, em Pallet' },
  Brock: { city: 'pewter', dx: 0, place: 'Ginásio de Pewter' },
  Misty: { city: 'cerulean', dx: 0, place: 'Ginásio de Cerulean' },
  'Lt. Surge': { city: 'vermilion', dx: 0, place: 'Ginásio de Vermilion' },
  Erika: { city: 'celadon', dx: 0, place: 'Ginásio de Celadon' },
  Koga: { city: 'fuchsia', dx: 0, place: 'Ginásio de Fuchsia' },
  Sabrina: { city: 'saffron', dx: 0, place: 'Ginásio de Saffron' },
  Blaine: { city: 'cinnabar', dx: 0, place: 'Ginásio da Ilha Cinnabar' },
  Giovanni: { city: 'viridian', dx: 0, place: 'Ginásio de Viridian' },
  'Team Rocket': { city: 'lavender', dx: 0, place: 'Torre Pokémon, em Lavender' },
  Lance: { city: 'indigo', dx: 0, place: 'Elite Quatro, no Platô Índigo' },
}

export const LAND_PATH =
  'M60 70 C 200 30, 420 40, 560 50 C 680 55, 760 90, 770 180 C 785 280, 760 380, 730 450 C 700 520, 560 560, 450 545 C 380 540, 300 540, 270 505 C 240 490, 200 510, 150 505 C 90 500, 40 450, 35 360 C 30 260, 20 140, 60 70 Z'

export const ISLAND_PATH = 'M150 592 C 150 570, 190 562, 222 572 C 246 580, 240 610, 206 614 C 172 618, 150 610, 150 592 Z'
