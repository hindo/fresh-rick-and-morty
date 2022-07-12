/** @jsx h */
import { Fragment, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { apply, css, tw } from "twind/css";
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
          class={tw`
              flex items-center justify-between cursor-pointer w-6 h-6 bg-gray-200
              rounded-full relative transition-all overflow-hidden
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
            class={tw`absolute top-0 h-6 w-6 transition-all
            ${
              css({
                ".peer:not(:checked) + &": apply`-top-6`,
                ".peer:checked + &": apply`top-0`,
              })
            }
          `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class={tw`h-6 w-6 bg-gray-200 text-gray-800 rounded-full`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class={tw`h-6 w-6 bg-gray-800 text-gray-200 rounded-full`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </label>
      </div>
    </Fragment>
  );
}
