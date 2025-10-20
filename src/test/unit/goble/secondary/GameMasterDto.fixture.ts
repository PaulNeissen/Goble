import { GameMasterDto } from "@/goble/secondary/GameMasterDto";
import { buildMovesDto } from "./MoveDto.fixture";
import { buildDiggersbyDataDto, buildMarowakDataDto } from "./PokemonDataDto.fixture";

export const buildGameMasterDto = (): GameMasterDto => ({
  moves: buildMovesDto(),
  pokemon: [buildDiggersbyDataDto(), buildMarowakDataDto()]
});

