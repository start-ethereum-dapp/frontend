import { ExternalProvider } from "@ethersproject/providers";

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

export const connectWallet = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("please install MetaMask");
    }

    const accounts = await ethereum!.request!({
      method: "eth_requestAccounts",
    });

    return accounts[0];
  } catch (error) {
    console.log(error);
  }
};

export const isWalletConnected = async () => {
  try {
    const { ethereum } = window;

    const accounts = await ethereum!.request!({ method: "eth_accounts" });
    console.log("accounts: ", accounts);

    if (accounts.length > 0) {
      const account = accounts[0];
      console.log("wallet is connected! " + account);
      return account;
    } else {
      console.log("make sure MetaMask is connected");
    }
  } catch (error) {
    console.log("error: ", error);
  }
};
