/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

import Layout from "../../../src/components/Layout.tsx";
import EpisodeCard from "../../../src/components/EpisodeCard.tsx";

import BackButton from '../../../islands/BackButton.tsx';

import { Character } from "../../../src/types/Character.ts";
import { Episode } from "../../../src/types/Episode.ts";

const CHARACTER_URL = "https://rickandmortyapi.com/api/character/";
const EPISODE_URL = "https://rickandmortyapi.com/api/episode/";

export const handler: Handlers<[Character, Episode[]] | null> = {
  async GET(_, ctx) {
    const resp = await Promise.all([
      fetch(CHARACTER_URL + `${ctx.params.character}`),
      fetch(EPISODE_URL + `${ctx.params.episodes}`),
    ]);

    if (resp.some((item) => item.status === 404)) {
      return ctx.render(null);
    }

    const response = await Promise.all(resp.map((item) => item.json())) as [
      Character,
      Episode[],
    ];
    return ctx.render(response);
  },
};

export default function Episodes(
  { data }: PageProps<[character: Character, episodes: Episode[]]>,
) {
  const [character, episodes] = data;
  return (
    <Layout>
        <div class={tw`m-auto w-10/12`}>
        <BackButton />
        <div class={tw`flex flex-col items-center mb-5`}>
          <img
            class={tw`rounded-full border-4 border-indigo-500 mb-2`}
            src={character.image}
          />
          <span class={tw`text-3xl backdrop-filter backdrop-blur`}>
            {character.name}
          </span>
          <span>{character.type}</span>
        </div>
        {Array.isArray(episodes)
          ? (
            <div class={tw`grid grid-cols-3 gap-4 mb-5`}>
              {episodes.map((episode) => <EpisodeCard episode={episode} />)}
            </div>
          )
          : <EpisodeCard episode={episodes} />}
        </div>
    </Layout>
  );
}
