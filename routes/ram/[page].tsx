/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

import Pagination from "../../components/pagination.tsx";
import CharacterCard from "../../islands/CharacterCard.tsx";
import ThemeSwitcher from "../../islands/ThemeSwitcher.tsx";

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
    <Fragment>
      <Head>
        <title>Rick and Morty Characters</title>
      </Head>
      <main
        class={tw`h-screen overflow-auto bg-gray-200 text-gray-800 dark:(bg-gray-800 text-gray-200)`}
      >
        <div
          class={tw`
            sticky top-0 bg-gray-200 mb-5 px-3 py-5 flex items-center justify-between border-b border-gray-400
            dark:(bg-gray-800 border-gray-600)
          `}
        >
          <div class={tw`text-3xl`}>Rick and Morty Characters</div>
          <ThemeSwitcher />
        </div>
        <div class={tw`flex justify-center`}>
          <div class={tw`w-2/3`}>
            <div class={tw`flex flex-col items-center`}>
              <div class={tw`grid grid-cols-5 gap-4 mb-5`}>
                {data.results.map((character) => (
                  <CharacterCard character={character} />
                ))}
              </div>
              <Pagination
                classNames={tw`mb-5`}
                currentPage={parseInt(params.page)}
                totalPages={data.info.pages}
              />
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
