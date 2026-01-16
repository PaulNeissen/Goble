import { Pokemon } from "@/goble/domain/Pokemon";
import { buildAerialAce, buildBoneClub, buildDig, buildFirePunch, buildFuryCutter, buildHydroCannon, buildIceBean, buildMudSlap, buildQuickAttack, buildRockSlide, buildScorchingSands } from "./Move.fixture";

export const buildDiggersby = (withMove?: boolean): Pokemon => ({
  id: 'diggersby',
  name: 'diggersby',
  dex: 660,
  types: ['normal', 'ground'],
  shadow: false,
  region: '',
  score: 100,
  rank: 1,
  fastMove: buildQuickAttack(withMove),
  chargedMove1: buildScorchingSands(withMove),
  chargedMove2: buildFirePunch(withMove),
  counter: {name: 'cradily'} as Pokemon,
  matchup: {name: 'dedenne'} as Pokemon,
  evolution: 2,
});

export const buildMarowak = (withMove?: boolean): Pokemon => ({
  id: 'marowak_shadow',
  name: 'marowak',
  dex: 105,
  types: ['ground', 'none'],
  shadow: true,
  region: '',
  score: 90,
  rank: 2,
  fastMove: buildMudSlap(withMove),
  chargedMove1: buildBoneClub(withMove),
  chargedMove2: buildRockSlide(withMove),
  counter: {name: 'azumarill'} as Pokemon,
  matchup: {name: 'dedenne'} as Pokemon,
  evolution: 1,
});

export const buildGligar = (): Pokemon => ({
  id: 'gligar',
  name: 'gligar',
  dex: 1,
  types: ['ground', 'flying'],
  shadow: false,
  region: '',
  score: 95,
  rank: 18,
  fastMove: buildFuryCutter(),
  chargedMove1: buildAerialAce(),
  chargedMove2: buildDig(),
  counter: {} as Pokemon,
  matchup: {} as Pokemon,
  evolution: 1,
});

export const buildGliscor = (): Pokemon => ({
  id: 'gliscor',
  name: 'gliscor',
  dex: 1,
  types: ['ground', 'flying'],
  shadow: false,
  region: '',
  score: 85,
  rank: 94,
  fastMove: buildFuryCutter(),
  chargedMove1: buildScorchingSands(true),
  chargedMove2: buildDig(),
  counter: {} as Pokemon,
  matchup: {} as Pokemon,
  evolution: 2,
});

export const buildFeraligator = (): Pokemon => ({
  id: 'feraligator_shadow',
  name: 'feraligator',
  dex: 1,
  types: ['water', 'none'],
  shadow: true,
  region: '',
  score: 88,
  rank: 83,
  fastMove: buildFuryCutter(),
  chargedMove1: buildHydroCannon(),
  chargedMove2: buildIceBean(),
  counter: {} as Pokemon,
  matchup: {} as Pokemon,
  evolution: 3,
});
