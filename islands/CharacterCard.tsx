/** @jsx h */
import { asset } from "$fresh/runtime.ts";
import { Fragment, h } from "preact";
import { useState } from "preact/hooks";
import { apply, css, tw } from "@twind";

import { Character } from "../src/types/Character.ts";

type CharacterCardProps = {
  character: Character;
};

const styles = {
  card: css(apply`
    relative
    border rounded-lg overflow-hidden
    border-gray-300 dark:(border-gray-700) hover:border-indigo-500
    text-gray-800 dark:(text-gray-200)
    bg-gray-200 dark:(bg-gray-800)
    hover:bg-gray-300 dark:(hover:bg-gray-700)
  `),
};

export default function CharacterCard({ character }: CharacterCardProps) {
  const [isOpen, setOpened] = useState<boolean>(false);

  const episodes = character.episode.map((url) => {
    const parts = url.split("/");
    return parts.at(-1);
  }).join(",");

  return (
    <Fragment>
      <div>
        <div
          class={tw`${styles.card} group transition-all`}
        >
          <span
            class={tw
              `absolute w-6 h-6 top-1 right-1 opacity-0 group-hover:opacity-100 cursor-pointer`}
            onClick={() => setOpened(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <div class={tw`flex items-center p-3`}>
            <button
              class={tw`focus:outline-none flex-shrink-0`}
              onClick={() => setOpened(true)}
            >
              <img
                class={tw`
              mr-3 rounded-full h-[100px] w-[100px] border(2 transparent group-hover:indigo-500)
            `}
                title={character.name}
                src={asset(character.image)}
              />
            </button>
            <div class={tw`px-2 flex flex-col`}>
              <span class={tw`text-xl`}>{character.name}</span>
              <span class={tw`text-sm`}>Specie: {character.species}</span>
              <span class={tw`text-sm`}>Gender: {character.gender}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class={tw`
        ${isOpen ? "block" : "hidden"}
        absolute inset-0 bg-gradient-to-b from-gray-200 dark:from-gray-800 to-transparent opacity-100 z-10
      `}
        onClick={() => setOpened(false)}
      >
      </div>
      <div
        class={tw`
        ${isOpen ? "block" : "hidden"}
        fixed border border-indigo-500 transition-all rounded-lg top-1/2 left-1/2 w-1/3 h-auto -translate-x-1/2 -translate-y-1/2 bg-gray-300 dark:bg-gray-700 z-10 p-3`}
      >
        <div class={tw`relative pt-[170px]`}>
          <button
            type="button"
            class={tw`absolute top-0 right-0 z-20 cursor-pointer`}
            onClick={() => setOpened(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class={tw`h-5 w-5`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <div
            class={tw`flex(& col) items-center justify-center mb-5`}
          >
            <div
              class={tw`
              absolute top-0 left-1/2 -translate-y-1/2 rounded-full h-[300px] w-[300px]
            `}
            >
              <img
                class={tw`
              rounded-full h-[300px] w-[300px] border(& indigo-500)
            `}
                title={character.name}
                src={asset(character.image)}
              />
              <span
                class={tw
                  `absolute flex items-center bottom-6 right-0 rounded-full bg-gray-300 dark:bg-gray-700 border-4 border-indigo-500 px-3 py-1`}
              >
                {character.status === "Alive" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class={tw`h-5 w-5 text-green-500 mr-1`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
                {character.status === "Dead" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class={tw`h-5 w-5 text-red-500 mr-1`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
                {character.status === "unknown" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class={tw`h-5 w-5 text-blue-500 mr-1`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
                {character.status}
              </span>
            </div>
            <div
              class={tw
                `text-2xl py-2 font-semibold w-[350px] text-center -mt-10 z-20 backdrop-filter backdrop-blur`}
            >
              {character.name}
              {character.type && (
                <span class={tw`text-sm block`}>{character.type}</span>
              )}
            </div>
          </div>
          <div class={tw`flex items-start justify-between children:w-1/2 mb-5`}>
            {character.origin
              ? (
                <div class={tw`children:block`}>
                  <span class={tw`font-semibold`}>Origin</span>
                  <span>{character.origin.name}</span>
                </div>
              )
              : ""}

            {character.location && (
              <div class={tw`children:block`}>
                <span class={tw`font-semibold`}>Location</span>
                <span>{character.location.name}</span>
              </div>
            )}
          </div>
          <div>
            <span>Part of</span>{' '}
            <span class={tw`font-semibold`}>{character.episode.length}</span>{' '}
            <span>episode(s) found</span>{' '}
            <a class={tw`text-indigo-700 dark:text-indigo-300`} href={`/ram/${character.id}/${episodes}`}>here</a>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
