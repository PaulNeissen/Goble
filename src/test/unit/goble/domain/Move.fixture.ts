import { Move } from "@/goble/domain/Move";

export const buildFuryCutter = (): Move => ({
  id: 'FURY_CUTTER',
  name: 'Fury Cutter',
  type: 'bug',
  turn: 1,
});

export const buildWrap = (): Move => ({
  id: 'WRAP',
  name: 'Wrap',
  type: 'normal',
  turn: 1,
});

export const buildQuickAttack = (isFull? : boolean): Move => ({
  id: 'QUICK_ATTACK',
  name: isFull ? 'Quick Attack' : '',
  type: isFull ? 'normal' : '',
  turn: 2,
});

export const buildMudSlap = (isFull? : boolean): Move => ({
  id: 'MUD_SLAP',
  name: isFull ? 'Mud Slap' : '',
  type: isFull ? 'ground' : '',
  turn: 3,
});

export const buildScorchingSands = (isFull? : boolean): Move => ({
  id: 'SCORCHING_SANDS',
  name: isFull ? 'Scorching Sands' : '',
  type: isFull ? 'ground' : '',
  turn: 1,
});

export const buildFirePunch = (isFull? : boolean): Move => ({
  id: 'FIRE_PUNCH',
  name: isFull ? 'Fire Punch' : '',
  type: isFull ? 'fire' : '',
  turn: 1,
});

export const buildBoneClub = (isFull? : boolean): Move => ({
  id: 'BONE_CLUB',
  name: isFull ? 'Bone Club' : '',
  type: isFull ? 'ground' : '',
  turn: 1,
});

export const buildRockSlide = (isFull? : boolean): Move => ({
  id: 'ROCK_SLIDE',
  name: isFull ? 'Rock Slide' : '',
  type: isFull ? 'rock' : '',
  turn: 1,
});

export const buildAerialAce = (): Move => ({
  id: 'AERIAL_ACE',
  name: 'Aerial Ace',
  type: 'flying',
  turn: 1,
});

export const buildDig = (): Move => ({
  id: 'DIG',
  name: 'Dig',
  type: 'ground',
  turn: 1,
});

export const buildHydroCannon = (): Move => ({
  id: 'HYDRO_CANNON',
  name: 'Hydro Cannon',
  type: 'water',
  turn: 1,
});

export const buildIceBean = (): Move => ({
  id: 'ICE_BEAM',
  name: 'Ice Bean',
  type: 'ice',
  turn: 1,
});