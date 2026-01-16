import { PokemonDataDto } from "@/goble/secondary/PokemonDataDto"

export const buildDiggersbyDataDto = (): PokemonDataDto => ({
  speciesId: 'diggersby',
  types: ['normal', 'ground'],
  dex: 660,
  family: {parent: "Bunnelby"}
})

export const buildMarowakDataDto = (): PokemonDataDto => ({
  speciesId: 'marowak_shadow',
  types: ['ground', 'none'],
  dex: 105,
  family: {evolutions: ["test"]}
})

