import { Contract } from "ethers";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import abi from "../../contracts/StarkToken.json";
import contractAddress from "../../contracts/StarkToken-address.json";
import Mint from "./Mint";
import useContractContext, { ContractContext } from "../../hooks/Contract";

export default function ContractComponent() {
  const [isQuerying, setIsQuerying] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [balance, setBalance] = useState(0);
  const {
    getProviderOrSigner,
    userAddress,
    walletConnected,
    connectWallet,
  }: ContractContext = useContractContext() as ContractContext;

  const mintToken = async (amount: number) => {
    try {
      const signer = await getProviderOrSigner(true);
      const starkTokenContract = new Contract(
        contractAddress.contractAddress,
        abi.abi,
        signer
      );
      const transaction = await starkTokenContract.mint(amount);
      await transaction.wait();
      // console.log("TRANSACTION", transaction);
      await getBalance();
    } catch (error) {}
  };

  const getBalance = async () => {
    try {
      setIsQuerying(true);
      const provider = await getProviderOrSigner();
      const starkTokenContract = new Contract(
        contractAddress.contractAddress,
        abi.abi,
        provider
      );
      // console.log(curAddress);

      const balance = await starkTokenContract.balanceOf(userAddress);
      // console.log("BALANCE", balance);
      setBalance(balance.toNumber());
      setIsQuerying(false);
    } catch (error) {
      console.log(error); // ! consider to display error to user
      setIsQuerying(false);
      setIsError(true);
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open

      connectWallet();
    }
  }, [walletConnected]);

  const renderComponents = () => {
    if (walletConnected) {
      return (
        <>
          <h1 className="text-3xl font-semibold">Stark token example</h1>
          <div>
            <div className="flex justify-between border-2 rounded-md p-2 bg-green-100 dark:text-black">
              <h2 className="my-auto">Tokens owned</h2>
              <p className="my-auto text-xl">{balance}</p>
            </div>
            <div className="flex h-5 gap-2 justify-bet my-2">
              <p
                onClick={getBalance}
                className="text-sm border-b cursor-pointer hover:border-blue-200 hover:border-b-2"
              >
                Can't see your balances? Try to refresh{" "}
              </p>
              {isQuerying ? (
                <AiOutlineLoading3Quarters className="animate-spin my-auto" />
              ) : (
                <></>
              )}
            </div>
          </div>
          <Mint
            mintToken={mintToken}
            currentAccount={userAddress}
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
