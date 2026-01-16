import { Move } from "./Move";

export interface Pokemon {
  id: string;
  name: string;
  dex: number;
  types: string[];
  shadow: boolean;
  region: string;
  score: number;
  rank: number;
  fastMove: Move;
  chargedMove1: Move;
  chargedMove2: Move;
  counter: Pokemon;
  matchup: Pokemon;
  evolution: number;
}

export const isSameFastMoveType = (pokemonToCompare: Pokemon, pokemon: Pokemon): boolean => {
  return pokemonToCompare.fastMove.type == pokemon.fastMove.type;
}

// [👻, 🔥], [👻, ❄️] => [✅,❌]
// [🔥, 👻], [👻, ❄️] => [❌,✅]
// [👻, ❄️], [👻, ❄️] => [✅,✅]
// [❄️, 👻], [👻, ❄️] => [✅,✅]
// [👻, 👻], [👻, ❄️] => [✅,❌]
// [🔥, 💧], [👻, ❄️] => [❌,❌]
export const areSameChargedMoveType = (pokemonToCompare: Pokemon, pokemon: Pokemon): boolean[] => {
  const movesToCompare: [string, string] = [pokemonToCompare.chargedMove1.type, pokemonToCompare.chargedMove2.type];
  const moves: [string, string] = [pokemon.chargedMove1.type, pokemon.chargedMove2.type];
  const results: boolean[] = [];

  // On copie moves pour "consommer" les correspondances
  const available = [...moves];

  for (const move of movesToCompare) {
    const idx = available.indexOf(move);
    if (idx !== -1) {
      results.push(true);
      available.splice(idx, 1); // on retire la correspondance trouvée
    } else {
      results.push(false);
    }
  }

  return results;
}

export const shareOneType = (pokemonToCompare: Pokemon, pokemon: Pokemon): boolean => {
  if (pokemonToCompare.types == undefined || pokemon.types == undefined)
    return false;
  return pokemonToCompare.types.some(typeToCompare =>
    pokemon.types.some(type => typeToCompare === type && type !== "none")
  );
}
