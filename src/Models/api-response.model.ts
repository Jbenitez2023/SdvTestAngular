import { Person } from "./Person.model";

export interface ApiResponse {
  result: any[];
  isSucces: boolean;
  messages: string;
}
