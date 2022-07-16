/** @jsx h */
import { Fragment, h, ComponentChildren } from "preact";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";

import ThemeSwitcher from "../../islands/ThemeSwitcher.tsx";

type LayoutProps = {
  children: ComponentChildren;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Fragment>
      <Head>
        <title>Rick and Morty Characters</title>
      </Head>
      <main
        class={tw`h-screen overflow-auto bg-gray-200 text-gray-800
      dark:bg-gray-800 dark:text-gray-200`}
      >
        <div
          class={tw`
            sticky z-10 top-0 bg-gray-200 mb-5 px-3 py-5 flex items-center justify-between border-b border-gray-400 shadow-md
            dark:bg-gray-800 dark:border-gray-600
          `}
        >
          <div class={tw`text-3xl`}>Rick and Morty Characters</div>
          <ThemeSwitcher />
        </div>
        {children}
      </main>
    </Fragment>
  );
}
