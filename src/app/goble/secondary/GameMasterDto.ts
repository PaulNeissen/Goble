import { MoveDto } from "./MoveDto";
import { PokemonDataDto } from "./PokemonDataDto";

export interface GameMasterDto {
  moves: MoveDto[];
  pokemon: PokemonDataDto[];
}
