export interface Move {
  id: string;
  name: string;
  type: string;
  turn: number;
}

export const emptyMove = (id: string = 'NO_MOVE'): Move => {
  return {
    id: id,
    name: '',
    type: '',
    turn: 0,
  };
}
