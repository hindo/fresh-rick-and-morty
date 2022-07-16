/** @jsx h */
import { h } from "preact";
import { tw } from '@twind';

import { Episode } from '../../types/Episode.ts'

export default function EpisodeCard({episode}: {episode: Episode}) {
  return (
    <div class={tw`border border-indigo-500 rounded-md p-5 children:block`}>
      <span class={tw`text-xl font-semibold`}>{episode.name}</span>
      <span>{episode.episode}</span>
    </div>
  )
}