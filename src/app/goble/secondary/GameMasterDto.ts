import { Move } from "../domain/Move";
import { Pokemon } from "../domain/Pokemon";
import { MoveDto, toMoves } from "./MoveDto";
import { PokemonDataDto, toPokemonsData } from "./PokemonDataDto";

export interface GameMasterDto {
  moves: MoveDto[];
  pokemon: PokemonDataDto[];
}

export const toPokemonDataAndMove = (gameMaster: GameMasterDto): {pokemonsData: Pokemon[]; moves: Move[]} => ({
  pokemonsData: toPokemonsData(gameMaster.pokemon),
  moves: toMoves(gameMaster.moves)
})