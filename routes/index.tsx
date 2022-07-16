/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers } from '$fresh/server.ts';

export const handler: Handlers = {
  GET() {
    return new Response('Redirecting to /ram/1', {
      headers: { "Location": "/ram/1"},
      status: 307,
    });
  },
}

export default function Home() {
  return (
    <div class={tw`p-4 mx-auto max-w-screen-md dark:(bg-gray-500)`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class={tw`my-6`}>
        Welcome to `fresh`. Try update this message in the ./routes/index.tsx
        file, and refresh.
      </p>
    </div>
  );
}
