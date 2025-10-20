import { Observable } from "rxjs";
import { Move } from "./Move";

export interface MovePort {
    list(): Observable<Move[]>;
}