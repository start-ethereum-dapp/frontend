import { AppContextProvider } from "../context/AppContext";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <AppContextProvider>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default MyApp;
