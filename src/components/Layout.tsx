/** @jsx h */
import { ComponentChildren, Fragment, h } from "preact";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";

import Footer from "./Footer.tsx";
import Header from "./Header.tsx";

type LayoutProps = {
  children: ComponentChildren;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div
      class={tw
        `h-screen w-full flex flex-col bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200`}
    >
      <Header />
      <main
        class={tw`overflow-auto mb-10`}
      >
        <div class={tw``}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
