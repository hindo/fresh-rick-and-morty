/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

import Layout from "../../src/components/Layout.tsx";
import Pagination from "../../src/components/Pagination.tsx";
import CharacterCard from "../../islands/CharacterCard.tsx";

import { CharactersResponse } from "../../types/Character.ts";

const URL = "https://rickandmortyapi.com/api/character/";

export const handler: Handlers<CharactersResponse | null> = {
  async GET(_, ctx) {
    const resp = await fetch(URL + `?page=${ctx.params.page}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }

    const charactersResponse = await resp.json();
    return ctx.render(charactersResponse);
  },
};

export default function Page({ data, params }: PageProps<CharactersResponse>) {
  return (
    <Layout>
      <div class={tw`flex flex-col items-center justify-center`}>
        <div class={tw`w-10/12`}>
          <div class={tw`grid grid-cols-4 gap-4 mb-5`}>
            {data.results.map((character) => (
              <CharacterCard character={character} />
            ))}
          </div>
        </div>
        <Pagination
          classNames={tw`mb-5`}
          currentPage={parseInt(params.page)}
          totalPages={data.info.pages}
        />
      </div>
    </Layout>
  );
}
