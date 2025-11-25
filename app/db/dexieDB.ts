import Dexie, { Table } from 'dexie';

export interface Journal {
  date: string;
  user: string;
  content: string;
  mood: number;
}

export class TaoistDB extends Dexie {
  journals!: Table<Journal, string>;
  constructor() {
    super('TaoistDiariesDB');
    this.version(1).stores({
      journals: 'date,user'
    });
  }
}

export const db = new TaoistDB();
