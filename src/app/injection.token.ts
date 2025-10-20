import { InjectionToken } from "@angular/core";
import { PokemonPort } from "./goble/domain/PokemonPort";
import { MovePort } from "./goble/domain/MovePort";

export const POKEMON_PORT = new InjectionToken<PokemonPort>('PokemonPort');
export const MOVE_PORT = new InjectionToken<MovePort>('MovePort');
