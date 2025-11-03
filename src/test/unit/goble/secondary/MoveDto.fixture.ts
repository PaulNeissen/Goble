import { MoveDto } from "@/goble/secondary/MoveDto";

export const buildQuickAttack = (): MoveDto => ({
  moveId: 'QUICK_ATTACK',
  name: 'Quick Attack',
  type: 'normal',
  turns: 2,
});

export const buildScorchingSands = (): MoveDto => ({
  moveId: 'SCORCHING_SANDS',
  name: 'Scorching Sands',
  type: 'ground',
  turns: 1,
});

export const buildFirePunch = (): MoveDto => ({
  moveId: 'FIRE_PUNCH',
  name: 'Fire Punch',
  type: 'fire',
  turns: 1,
});

export const buildMudSlap = (): MoveDto => ({
  moveId: 'MUD_SLAP',
  name: 'Mud Slap',
  type: 'ground',
  turns: 3,
});

export const buildBoneClub = (): MoveDto => ({
  moveId: 'BONE_CLUB',
  name: 'Bone Club',
  type: 'ground',
  turns: 1,
});

export const buildRockSlide = (): MoveDto => ({
  moveId: 'ROCK_SLIDE',
  name: 'Rock Slide',
  type: 'rock',
  turns: 1,
});

export const buildMovesDto = (): MoveDto[] => ([
  buildQuickAttack(),
  buildScorchingSands(),
  buildFirePunch(),
  buildMudSlap(),
  buildBoneClub(),
  buildRockSlide()
]);
