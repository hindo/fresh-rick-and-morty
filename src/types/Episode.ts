import { Character } from "./Character.ts";
import { Response } from "./generic.ts";

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
  url: string;
  created: Date;
};

export type EpisodesResponse = Response<Episode>;
