import { Pokemon } from "../domain/Pokemon";
import { CounterDto } from "./CounterDto";
import { GameMasterDto } from "./GameMasterDto";
import { MatchupDto } from "./MatchupDto";
import { MoveDto, toMove } from "./MoveDto";
import { PokemonDataDto } from "./PokemonDataDto";

export interface PokemonRankingDto {
  speciesId: string;
  score: number;
  moveset: string[];
  counters: CounterDto[];
  matchups: MatchupDto[];
}

const evolution = (pokemonDataDto: PokemonDataDto, gameMasterDto: GameMasterDto) => {
  const hasParent = pokemonDataDto.family?.parent !== undefined;
  const hasEvolutions = pokemonDataDto.family?.evolutions !== undefined && pokemonDataDto.family.evolutions.length > 0;
  
  if (!hasParent && hasEvolutions) {
    return 1; // Première évolution
  } else if (hasParent && hasEvolutions) {
    return 2; // Évolution intermédiaire
  } else if (hasParent && !hasEvolutions) {
    // Compter le nombre de parents pour déterminer si c'est 2 ou 3
    let parentCount = 0;
    let currentParent = pokemonDataDto.family?.parent;
    
    while (currentParent) {
      parentCount++;
      const parentData = gameMasterDto.pokemon.find(p => p.speciesId === currentParent);
      currentParent = parentData?.family?.parent;
    }
    
    return parentCount === 1 ? 2 : 3; // 2 si 1 parent, 3 si 2 parents ou plus
  }
  
  return 1; // Par défaut
}

export const toPokemon = (pokemonRankingDto: PokemonRankingDto, rank: number, pokemonDataDto: PokemonDataDto, moves: MoveDto[], gameMasterDto: GameMasterDto): Pokemon => {
  let fullname = pokemonRankingDto.speciesId.split('_');
  
  return {
    id: pokemonRankingDto.speciesId,
    name: fullname[0],
    dex: pokemonDataDto.dex,
    types: pokemonDataDto.types,
    shadow: pokemonRankingDto.speciesId.includes('shadow'),
    region: fullname.length > 1 && fullname[1] !== 'shadow' ? fullname[1] : '',
    score: pokemonRankingDto.score,
    rank: rank + 1,
    fastMove: toMove(moves.find(m => m.moveId === pokemonRankingDto.moveset[0])),
    chargedMove1: toMove(moves.find(m => m.moveId === pokemonRankingDto.moveset[1])),
    chargedMove2: toMove(moves.find(m => m.moveId === pokemonRankingDto.moveset[2])),
    counter: {name: pokemonRankingDto.counters[0].opponent.replace('_shadow', '')} as Pokemon,
    matchup: {name: pokemonRankingDto.matchups[0].opponent.replace('_shadow', '')} as Pokemon,
    evolution: evolution(pokemonDataDto, gameMasterDto)
  };
}

export const toPokemons = (pokemonRankingDtos: PokemonRankingDto[], gameMasterDto: GameMasterDto): Pokemon[] => {
  let pokemons: Pokemon[] = [];
  const registered = new Set();

  // On garde que les 3000 premiers résultats
  pokemonRankingDtos.slice(0, 3000).forEach((pokemonRankingDto, index) => { 
    const pokemonDataDto = gameMasterDto.pokemon.find(p => p.speciesId === pokemonRankingDto.speciesId);
    const pokemonId = pokemonDataDto!.speciesId
      .replace('_shadow','') // On enlève le shadow pour garder que le mieux classé entre le standrad et le shadow
      .replace(/_[a-z]$/i, ''); // On enlève les pokémons du classement qui ont une deuxième occurence avec un move différent
    if (registered.has(pokemonId))
      return;
    let pokemon = toPokemon(pokemonRankingDto, index, pokemonDataDto!, gameMasterDto.moves, gameMasterDto);
    pokemons.push(pokemon);
    registered.add(pokemonId);
  })
  return pokemons;
}
