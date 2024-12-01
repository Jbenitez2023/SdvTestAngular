import { PersonMateria } from "./Person_materia.models";
import { Profession } from "./Profession.models";
import { Weapon } from "./Weapons.models";


export interface Person {
    id: number;
    name: string;
    age: number;
    idProfession: number;
    idWeaponEquiped: number;
    lvl: number;
    weapons: Weapon; // O puedes definir una estructura más detallada si tienes una lista de armas
    professions: Profession; // Lo mismo para profesiones
    people_materia: PersonMateria[]; // Si es un objeto o lista, lo defines aquí
  }