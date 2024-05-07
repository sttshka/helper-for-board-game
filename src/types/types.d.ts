import { Characteristics } from './enums.ts';

export interface ICharacteristic {
  title: string;
  name: Characteristics;
  value: number;
}

export interface IPlayer {
  id?: string;
  name: string;
  color: string;
  characteristics: ICharacteristic[];
}
