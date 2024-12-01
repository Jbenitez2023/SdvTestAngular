import { Profession } from "./Profession.models";

export interface Weapon {
    id: number;
    name: string;
    idProfession: number;
    strBoost:number;
    mgBoost:number;
    professions: Profession;
  }