import { Materia } from "./Materia.models";
import { Person } from "./Person.model";


export interface PersonMateria {
    id: number;
    idPeople: number;
    idMateria: number;
    nameMateria: string;
  }