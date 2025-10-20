import { forkJoin, map, Observable } from "rxjs";
import { Pokemon } from "../domain/Pokemon";
import { PokemonPort } from "../domain/PokemonPort";
import { HttpClient } from "@angular/common/http";
import { PokemonRankingDto, toPokemons } from "./PokemonRankingDto";
import { inject, Injectable } from "@angular/core";
import { GameMasterDto, toPokemonDataAndMove } from "./GameMasterDto";
import { Move } from "../domain/Move";

@Injectable({
  providedIn: 'root'
})
export class PokemonAdapter implements PokemonPort {
    private http = inject(HttpClient);

    private URL_PVPOKE: string = '/pvpoke-api/data/rankings/all/overall/rankings-1500.json?v=1.35.3.2';
    private URL_GAME_MASTER: string = '/pvpoke-api/data/gamemaster.min.json?v=1.35.3.2';

    list(): Observable<Pokemon[]> {
        return forkJoin({
            ranking: this.http.get<PokemonRankingDto[]>(this.URL_PVPOKE),
            gameMaster: this.http.get<GameMasterDto>(this.URL_GAME_MASTER)
        }).pipe(
            map(({ranking, gameMaster}) => toPokemons(ranking, gameMaster))
        );
    }

    gameMaster(): Observable<{pokemonsData: Pokemon[]; moves: Move[]}> {
        return this.http.get<GameMasterDto>(this.URL_GAME_MASTER).pipe(map(data => toPokemonDataAndMove(data)));
    }
}
