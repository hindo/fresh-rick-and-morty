/** @jsx h */
import { h } from "preact";
import { tw } from "twind";
import { asset } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import { Character } from "../types/Character.ts";

export default function CharacterCard({ character }: { character: Character }) {
  const [isOpened, setOpened] = useState<boolean>(false);

  return (
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
  );
}
