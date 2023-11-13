export interface ICoords {
  row: number;
  col: number;
}
export interface IPlayer {
  name: string;
  wins: number;
}
export interface IPlayerSet {
  [key: string]: IPlayer;
}
export type TCell = TTurn | null;
export type TTurn = 'cross' | 'zero';
