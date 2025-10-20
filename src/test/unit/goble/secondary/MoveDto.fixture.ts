import { MoveDto } from "@/goble/secondary/MoveDto";

export const buildQuickAttack = (): MoveDto => ({
  moveId: 'QUICK_ATTACK',
  name: 'Quick Attack',
  type: 'normal',
});

export const buildScorchingSands = (): MoveDto => ({
  moveId: 'SCORCHING_SANDS',
  name: 'Scorching Sands',
  type: 'ground',
});

export const buildFirePunch = (): MoveDto => ({
  moveId: 'FIRE_PUNCH',
  name: 'Fire Punch',
  type: 'fire',
});

export const buildMudSlap = (): MoveDto => ({
  moveId: 'MUD_SLAP',
  name: 'Mud Slap',
  type: 'ground',
});

export const buildBoneClub = (): MoveDto => ({
  moveId: 'BONE_CLUB',
  name: 'Bone Club',
  type: 'ground',
});

export const buildRockSlide = (): MoveDto => ({
  moveId: 'ROCK_SLIDE',
  name: 'Rock Slide',
  type: 'rock',
});

export const buildMovesDto = (): MoveDto[] => ([
  buildQuickAttack(),
  buildScorchingSands(),
  buildFirePunch(),
  buildMudSlap(),
  buildBoneClub(),
  buildRockSlide()
]);
