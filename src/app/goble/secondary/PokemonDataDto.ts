import { Pokemon } from "../domain/Pokemon";

export interface PokemonDataDto {
  speciesName: string;
  types: string[];
  dex: number;
}

export const toPokemonData = (pokemonDataDtos: PokemonDataDto[]): Pokemon => ({
    pokemonsData: toPokemonsData(gameMaster.pokemon),
    moves: toMoves(gameMaster.moves)
})