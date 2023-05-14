import { useTheme } from "next-themes";
import Image from "next/image";

import MoonIcon from "~/assets/svg/moon.svg";
import SunIcon from "~/assets/svg/sun.svg";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      className="opacity-50 transition-opacity hover:opacity-100"
      onClick={handleThemeChange}
    >
      <Image
        {...(theme === "light" ? MoonIcon : SunIcon)}
        alt="theme-switcher"
      />
    </button>
  );
};
