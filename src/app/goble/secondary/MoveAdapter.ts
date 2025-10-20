import { map, Observable } from "rxjs";
import { Move } from "../domain/Move";
import { MovePort } from "../domain/MovePort";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { GameMasterDto } from "./GameMasterDto";
import { toMoves } from "./MoveDto";

@Injectable({
  providedIn: 'root'
})
export class MoveAdapter implements MovePort {
    private http = inject(HttpClient);

    private URL_PVPOKE: string = '/pvpoke-api/data/gamemaster.min.json?v=1.35.3.2';

    list(): Observable<Move[]> {
        return this.http.get<GameMasterDto>(this.URL_PVPOKE).pipe(map(data => toMoves(data.moves)));
    }
}