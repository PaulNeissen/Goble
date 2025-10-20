export interface Move {
  id: string;
  name: string;
  type: string;
}

export const emptyMove = (id: string = 'NO_MOVE'): Move => {
  return {
    id: id,
    name: '',
    type: '',
  };
}
