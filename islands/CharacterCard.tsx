/** @jsx h */
import { asset } from "$fresh/runtime.ts";
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw, css, apply } from "@twind";

import { Character } from "../types/Character.ts";

type CharacterCardProps = {
  character: Character;
};

const styles = {
  card: css(apply`
    border rounded-lg overflow-hidden
    border-gray-300 dark:(border-gray-700)
    text-gray-800 dark:(text-gray-200)
    bg-gray-200 dark:(bg-gray-800)
    hover:bg-gray-300 dark:(hover:bg-gray-700)
  `),
}

export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div>
      <div
        class={tw(styles.card)}
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
    </div>
  );
}
