/** @jsx h */
import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { tw, css, apply } from "twind/css";
import { Head } from "$fresh/runtime.ts";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.theme = theme;
  }, [theme]);

  const handleOnChange: GlobalEventHandlers["onchange"] = (event) => {
    if (event.target instanceof HTMLInputElement) {
      const themeValue = event.target.checked;
      const theme = !themeValue ? "light" : "dark";
      setTheme(theme);
    }
  };

  return (
    <Fragment>
      <Head>
        <script>
          if (localStorage.theme)
          document.documentElement.classList.add(localStorage.theme);
        </script>
      </Head>
      <div class={tw`inline-flex flex-row`}>
        <label
          for="theme-toggler"
          class={tw
            `
              flex items-center justify-between cursor-pointer w-12 h-8 bg-gray-100
              rounded-full relative transition-bg ring ring-gray-300
            `}
        >
          <input
            name="theme"
            id="theme-toggler"
            type="checkbox"
            checked={theme === "dark"}
            onInput={handleOnChange}
            class={tw`peer sr-only`}
          />
          <span
            class={tw`
              absolute w-6 h-6 rounded-full transition bg-gray-200 active:w-6
              ${css({
                '.peer:checked + &': apply`right-1 bg-gray-800`,
                '.peer:not(:checked) + &': apply`left-1`,
                '.peer:not(:checked) + &:before':{content: '"☀️"', position: 'absolute', left: '4px'},
                '.peer:checked + &:before': {content: '"🌙"', position: 'absolute', left: '4px'},
              })}
            `}
          >

          </span>
        </label>
      </div>
    </Fragment>
  );
}
