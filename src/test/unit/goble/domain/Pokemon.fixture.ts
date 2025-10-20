import { Pokemon } from "@/goble/domain/Pokemon";
import { buildAerialAce, buildBoneClub, buildDig, buildFirePunch, buildFuryCutter, buildHydroCannon, buildIceBean, buildMudSlap, buildQuickAttack, buildRockSlide, buildScorchingSand } from "./Move.fixture";

export const buildDiggersby = (withMove?: boolean): Pokemon => ({
  id: 'Diggersby',
  name: 'Diggersby',
  dex: 660,
  types: ['normal', 'ground'],
  shadow: false,
  region: '',
  score: 100,
  fastMove: buildQuickAttack(withMove),
  chargedMove1: buildScorchingSand(withMove),
  chargedMove2: buildFirePunch(withMove),
  counter: buildFeraligator(),
  matchup: buildMarowak(),
});

export const buildMarowak = (withMove?: boolean): Pokemon => ({
  id: 'Marowak (Shadow) (Kanto)',
  name: 'Marowak',
  dex: 105,
  types: ['ground', 'none'],
  shadow: true,
  region: 'Kanto',
  score: 90,
  fastMove: buildMudSlap(withMove),
  chargedMove1: buildBoneClub(withMove),
  chargedMove2: buildRockSlide(withMove),
  counter: buildFeraligator(),
  matchup: buildDiggersby(),
});

export const buildGligar = (): Pokemon => ({
  id: 'Gligar',
  name: 'Gligar',
  dex: 1,
  types: ['ground', 'flying'],
  shadow: false,
  region: '',
  score: 95,
  fastMove: buildFuryCutter(),
  chargedMove1: buildAerialAce(),
  chargedMove2: buildDig(),
  counter: buildFeraligator(),
  matchup: buildDiggersby(),
});

export const buildGliscor = (): Pokemon => ({
  id: 'Gliscor',
  name: 'Gliscor',
  dex: 1,
  types: ['ground', 'flying'],
  shadow: false,
  region: '',
  score: 85,
  fastMove: buildFuryCutter(),
  chargedMove1: buildScorchingSand(true),
  chargedMove2: buildDig(),
  counter: buildFeraligator(),
  matchup: buildDiggersby(),
});

export const buildFeraligator = (): Pokemon => ({
  id: 'Feraligator (Shadow)',
  name: 'Feraligator',
  dex: 1,
  types: ['water', 'none'],
  shadow: true,
  region: '',
  score: 88,
  fastMove: buildFuryCutter(),
  chargedMove1: buildHydroCannon(),
  chargedMove2: buildIceBean(),
  counter: buildFeraligator(),
  matchup: buildDiggersby(),
});