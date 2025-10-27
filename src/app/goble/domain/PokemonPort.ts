import { Observable } from "rxjs";
import { Pokemon } from "./Pokemon";
import { Move } from "./Move";

export interface PokemonPort {
    list(): Observable<Pokemon[]>;
}