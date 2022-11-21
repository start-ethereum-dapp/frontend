import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "next-themes";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      className="text-3xl  rounded-full p-1 dark:bg-slate-900"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <MdLightMode className="m-auto" />
      ) : (
        <MdDarkMode className="m-auto" />
      )}
    </button>
  );
}
