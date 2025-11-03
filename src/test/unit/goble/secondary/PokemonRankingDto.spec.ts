import { toPokemon, toPokemons } from '@/goble/secondary/PokemonRankingDto';
import { buildDiggersby, buildMarowak } from '../domain/Pokemon.fixture';
import { buildDiggersbyDto, buildMarowakDto } from './PokemonRankingDto.fixture';
import { buildDiggersbyDataDto } from './PokemonDataDto.fixture';
import { buildMovesDto } from './MoveDto.fixture';
import { buildGameMasterDto } from './GameMasterDto.fixture';

describe('PokemonRankingDto', () => {
  it('should map to domain', () => {
    expect(toPokemon(buildDiggersbyDto(), 0, buildDiggersbyDataDto(), buildMovesDto())).toEqual(buildDiggersby(true));
  });

  it('should map a list to domain with one Pokémon', () => {
    expect(toPokemons([buildDiggersbyDto()], buildGameMasterDto())).toEqual([buildDiggersby(true)]);
  });

  it('should map a list to domain with twice the same Pokémon', () => {
    expect(toPokemons([buildDiggersbyDto(), buildDiggersbyDto()], buildGameMasterDto())).toEqual([buildDiggersby(true)]);
  });

  it('should map a list to domain with 2 Pokémons', () => {
    expect(toPokemons([buildDiggersbyDto(), buildMarowakDto()], buildGameMasterDto())).toEqual([buildDiggersby(true), buildMarowak(true)]);
  });
});
