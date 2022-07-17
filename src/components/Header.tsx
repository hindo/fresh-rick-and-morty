/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import ThemeSwitcher from "../../islands/ThemeSwitcher.tsx";

export default function Header() {
  return (
    <div
      class={tw`
            sticky z-10 top-0 bg-gray-200 mb-5 px-3 py-5 flex items-center justify-between border-b border-gray-400 shadow-md
            dark:bg-gray-800 dark:border-gray-600
          `}
    >
      <div class={tw`text-2xl`}>Rick and Morty Characters</div>
      <ThemeSwitcher />
    </div>
  );
}
