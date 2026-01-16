export interface PokemonDataDto {
  speciesId: string;
  types: string[];
  dex: number;
  family: {
    parent?: string;
    evolutions?: string[];
  };
}
