/** @jsx h */
import { Fragment, h } from "preact";
import { tw } from "@twind";

export default function Footer() {
  return (
    <footer
      class={tw`
        fixed bottom-0 text-xs p-2 w-full flex items-center justify-end
        bg-gray-200 dark:bg-gray-800
        border-t border-gray-300 dark:border-gray-700
      `}
    >
      <span>An experiment using</span>
      <a
        target="_blank"
        rel="nofollow noreferrer"
        class={tw`bg-green-300 text-gray-800 rounded-full px-3 py-1 mx-2`}
        href="https://fresh.deno.dev/"
      >
        fresh
      </a>
      <span>and</span>
      <a
        target="_blank"
        rel="nofollow noreferrer"
        class={tw`bg-gray-100 text-gray-800 rounded-full px-3 py-1 mx-2`}
        href="https://rickandmortyapi.com/"
      >
        The Rick and Morty API
      </a>
      ❤️
    </footer>
  );
}
