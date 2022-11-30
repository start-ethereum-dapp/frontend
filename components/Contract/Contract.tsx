import { providers, Contract, ethers } from "ethers";
import { useState, useRef, useEffect } from "react";
import Web3Modal from "web3modal";

import abi from "../../contracts/StarkToken.json";
import { AppContextInterface } from "../../context/AppContextTypes";
import contractAddress from "../../contracts/StarkToken-address.json";
import useAppContext from "../../context/AppContext";
import Mint from "./Mint";

export default function ContractComponent() {
  const [curAddress, setCurAddress] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [balance, setBalance] = useState(0);
  const web3ModalRef = useRef() as React.MutableRefObject<Web3Modal>;

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const address = await web3Provider.getSigner().getAddress();
    setCurAddress(address);
    // If user is not connected to the Goerli network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      // console.log("SIGNER", signer);
      return signer;
    }
    // console.log("PROVIDER", web3Provider);
    return web3Provider;
  };

  const mintToken = async (amount: number) => {
    try {
      const signer = await getProviderOrSigner(true);
      const starkTokenContract = new Contract(
        contractAddress.contractAddress,
        abi.abi,
        signer
      );
      setIsLoading(true);
      const transaction = await starkTokenContract.mint(amount);
      await transaction.wait();
      // console.log("TRANSACTION", transaction);
      await getBalance();
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const getBalance = async () => {
    try {
      const provider = await getProviderOrSigner();
      const starkTokenContract = new Contract(
        contractAddress.contractAddress,
        abi.abi,
        provider
      );
      // console.log(curAddress);
      const balance = await starkTokenContract.balanceOf(curAddress);
      // console.log("BALANCE", balance);
      setBalance(balance.toNumber());
    } catch (error) {
      console.log(error); // ! consider to display error to user
    }
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
      await getBalance();
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  const renderComponents = () => {
    if (walletConnected) {
      return (
        <>
          <h1 className="text-3xl font-semibold">Stark token example</h1>
          <div className="flex justify-between border-2 rounded-md p-2 bg-green-100 dark:text-black">
            <h2 className="my-auto">Tokens owned</h2>
            <p className="my-auto text-xl">{balance}</p>
          </div>
          <Mint
            mintToken={mintToken}
            currentAccount={currentAccount}
            walletConnected={walletConnected}
            balance={balance}
          />
        </>
      );
    }

    return (
      <div className="flex flex-col justify-center items-center mt-10">
        <p>Your wallet is not connected</p>
        <button
          onClick={connectWallet}
          className="bg-black dark:bg-slate-200 text-white dark:text-black my-10 mx-auto px-4 py-2 rounded-md shadow-md"
        >
          Connect your wallet
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-slate-100 dark:bg-slate-900 m-auto mt-10 p-5 max-w-md rounded-md shadow-xl gap-3">
      {renderComponents()}
    </div>
  );
}
