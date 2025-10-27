import { PokemonRankingDto } from "@/goble/secondary/PokemonRankingDto"

export const buildDiggersbyDto = (): PokemonRankingDto => ({
  speciesId: 'diggersby',
  score: 100,
  moveset: ['QUICK_ATTACK', 'SCORCHING_SANDS', 'FIRE_PUNCH'],
  counters: [{opponent: "cradily", rating: 371}],
  matchups: [{opponent: "dedenne", rating: 928, opRating: 71}]
});

export const buildMarowakDto = (): PokemonRankingDto => ({
  speciesId: 'marowak_shadow',
  score: 90,
  moveset: ['MUD_SLAP', 'BONE_CLUB', 'ROCK_SLIDE'],
  counters: [{opponent: "azumarill", rating: 295}, {opponent: "gastrodon", rating: 377}],
  matchups: [{opponent: "dedenne", rating: 907, opRating: 92}]
});
