import { useState, useEffect } from "react";

import { AppContextInterface } from "../../context/AppContextTypes";
import useAppContext from "../../context/AppContext";
import Mint from "./Mint";
import { BigNumber, Contract as ContractInterface, ethers } from "ethers";
import { ExternalProvider } from "@ethersproject/providers";

import { abi } from "../../contracts/StarkToken.json";
import { contractAddress } from "../../contracts/StarkToken-address.json";
import { StarkToken } from "../../contracts/types/contracts/StarkToken";
import { WalletAddress } from "./Contract.d";

export default function Contract() {
  const { currentAccount } = useAppContext() as AppContextInterface;
  const [contractInst, setContractInst] = useState<ContractInterface>();
  const [balance, setBalance] = useState(0); // BigNumber
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let provider;
  let signer;

  const contractSetUp = async () => {
    try {
      provider = new ethers.providers.Web3Provider(
        window.ethereum as ExternalProvider
      );
      console.log(provider);
      signer = provider.getSigner();
      console.log(signer);
      setContractInst(new ethers.Contract(contractAddress, abi, signer));
      console.log("Contract set up");
    } catch (error) {
      console.log("Contract setup failed", error);
      setIsError(true);
    }
  };

  const getBalance = async () => {
    try {
      const result = (await contractInst?.balanceOf(
        currentAccount
      )) as Promise<BigNumber>;
      result && setBalance((await result).toNumber());
      console.log("Balance of", currentAccount, "is", balance);
      return result;
    } catch (error) {
      console.log("Error getting balance", error);
      setIsError(true);
      return error;
    }
  };

  console.log(contractInst);

  useEffect(() => {
    setIsLoading(true);
    contractSetUp();
    getBalance();
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col bg-slate-200 dark:bg-slate-900 m-auto mt-10 p-5 max-w-md rounded-md shadow-xl gap-5">
      <div>
        <h1>Balance</h1>
        <div>{balance}</div>
      </div>
      <Mint
        contractInst={contractInst as StarkToken}
        currentAccount={currentAccount as WalletAddress}
        getBalance={getBalance as () => Promise<ethers.BigNumber>}
      />
    </div>
  );
}
