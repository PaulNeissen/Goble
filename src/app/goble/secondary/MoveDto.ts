import { emptyMove, Move } from "../domain/Move";

export interface MoveDto {
  moveId: string;
  name: string;
  type: string;
  turns: number;
}

export const toMove = (moveApi: MoveDto | undefined): Move => {
  if (moveApi) {
    return {
      id: moveApi.moveId,
      name: moveApi.name,
      type: moveApi.type,
      turn: moveApi.turns,
    };
  } else {
    return emptyMove();
  }
}

export const toMoves = (moveApis: MoveDto[]): Move[] => {
  return moveApis.map(move => toMove(move));
}