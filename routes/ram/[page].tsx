/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";
import Pagination from "../../components/pagination.tsx";
import ThemeSwitcher from "../../islands/ThemeSwitcher.tsx";

const URL = "https://rickandmortyapi.com/api/character/";

type Character = {
  name: string;
  image: string;
};

export const handler: Handlers<unknown[] | null> = {
  async GET(_, ctx) {
    const resp = await fetch(URL + `?page=${ctx.params.page}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }

    const pokemon = await resp.json();
    return ctx.render(pokemon);
  },
};

export default function Page({ data, params }: PageProps) {
  return (
    <main
      class={tw
        `h-screen overflow-auto bg-gray-200 text-gray-800 dark:(bg-gray-800 text-gray-200)`}
    >
      <div
        class={tw
          `
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
              {data.results.map((character: Character) => (
                <div
                  class={tw`
            group border rounded-lg overflow-hidden
            border-gray-300 dark:border-gray-700
            hover:bg-gray-300 dark:hover:bg-gray-700
          `}
                >
                  <img
                    class={tw`mb-3`}
                    title={character.name}
                    src={asset(character.image)}
                  />
                  <div class={tw`mb-3 px-2`}>
                    <span class={tw`text-xl`}>{character.name}</span>
                  </div>
                </div>
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
  );
}
