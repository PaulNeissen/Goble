import { Pokemon } from "../domain/Pokemon";
import { CounterDto } from "./CounterDto";
import { GameMasterDto } from "./GameMasterDto";
import { MatchupDto } from "./MatchupDto";
import { MoveDto, toMove } from "./MoveDto";
import { PokemonDataDto } from "./PokemonDataDto";

export interface PokemonRankingDto {
  speciesName: string;
  score: number;
  moveset: string[];
  counters: CounterDto[];
  matchups: MatchupDto[];
}

export const toPokemon = (pokemonRankingDto: PokemonRankingDto, pokemonDataDto: PokemonDataDto, moves: MoveDto[]): Pokemon => {
  let fullname = pokemonRankingDto.speciesName.replace(' (Shadow)', ''); // Enlève le shadow du nom
  let regionMatch = fullname.match(/\(([^)]+)\)/); // Cherche les substring entre parenthèses
  return {
    id: pokemonRankingDto.speciesName,
    name: fullname.replace(/\([^)]*\)/g, "").trim(), // Enlève ce qui se trouve entre parenthèse
    dex: pokemonDataDto.dex,
    types: pokemonDataDto.types,
    shadow: pokemonRankingDto.speciesName.includes('(Shadow)'),
    region: regionMatch ? regionMatch[1] : '', // TODO : il peut y avoir un qualificatif autre que la region
    score: pokemonRankingDto.score,
    fastMove: toMove(moves.find(m => m.moveId === pokemonRankingDto.moveset[0])),
    chargedMove1: toMove(moves.find(m => m.moveId === pokemonRankingDto.moveset[1])),
    chargedMove2: toMove(moves.find(m => m.moveId === pokemonRankingDto.moveset[2])),
    counter: pokemonRankingDto.counters[0].opponent,
    matchup: pokemonRankingDto.matchups[0].opponent,
  };
}

export const toPokemons = (pokemonRankingDtos: PokemonRankingDto[], gameMasterDto: GameMasterDto): Pokemon[] => {
  let pokemons: Pokemon[] = [];
  const registered = new Set();
  for (let pokemonRankingDto of pokemonRankingDtos) {
    const pokemonDataDto = gameMasterDto.pokemon.find(p => p.speciesName === pokemonRankingDto.speciesName);
    if (registered.has(pokemonDataDto!.dex))
      continue;
    let pokemon = toPokemon(pokemonRankingDto, pokemonDataDto!, gameMasterDto.moves);
    pokemons.push(pokemon);
    registered.add(pokemon.dex);
  }
  return pokemons;
}