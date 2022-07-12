/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";

export default function Card() {
  const [isOpened, setOpened] = useState<boolean>(false);

  return <div>Card</div>;
}
