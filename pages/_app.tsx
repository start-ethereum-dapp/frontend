import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import { EthereumContextProvider } from "../hooks/ContractContext";

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
