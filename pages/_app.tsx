import { AppContextProvider } from "../hooks/AppContext";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import { EthereumContextProvider } from "../hooks/Contract";

function App({ Component, pageProps }: any) {
  return (
    <ThemeProvider attribute="class">
      <EthereumContextProvider>
        <Component {...pageProps} />
      </EthereumContextProvider>
    </ThemeProvider>
  );
}

export default App;
