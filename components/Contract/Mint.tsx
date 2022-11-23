import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiCircleAlert } from "react-icons/ci";

import { ContractProps } from "./Contract.d";
import { AppContextInterface } from "../../context/AppContextTypes";
import useAppContext from "../../context/AppContext";
import { Theme, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Mint({
  contractInst,
  currentAccount,
  getBalance,
}: ContractProps) {
  const theme: Theme = window.localStorage.getItem("theme") as Theme;
  const { isLogin } = useAppContext() as AppContextInterface;
  const [tokensToMint, setTokensToMint] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const mint = async () => {
    try {
      console.log("Minting...");
      const tx = await contractInst.mint(currentAccount, tokensToMint, {
        value: tokensToMint * 500000000000000,
      });
      const result = await tx.wait();
      console.log("Minted");
      notifySuccess("1 token minted successfully");
      return result;
    } catch (error) {
      console.log("Error minting", error);
      notifyError("Error minting");
      setIsError(true);
      return error;
    }
  };

  const handleMint = async () => {
    setIsLoading(true);
    const res = await mint();
    if (res) {
      await getBalance();
      console.log(res);
    }
    setIsLoading(false);
  };

  // todo: fix toastId
  const notifyError = (message: string) =>
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      toastId: "error",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme,
    });

  // todo: fix toastId
  const notifySuccess = (message: string) => {
    toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      toastId: "success",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme,
    });
  };

  return (
    <>
      <ToastContainer />
      <div className=" bg-slate-200 dark:bg-slate-800 py-5 px-3 rounded-md">
        <div className="flex flex-row justify-between">
          {" "}
          <h2 className="my-auto text-xl">Mint 1 token</h2>
          <button
            className="bg-gray-900 dark:bg-black text-white font-bold py-2 px-4 rounded"
            onClick={handleMint}
            disabled={!isLogin || isLoading}
          >
            {!isLoading ? (
              "MINT"
            ) : (
              <AiOutlineLoading3Quarters className="animate-spin" />
            )}
          </button>
        </div>
        <div className="flex gap-2 mt-7 text-sm text-slate-700 dark:text-slate-400">
          <CiCircleAlert className="my-auto" />
          <p className="">
            Each token have a price of <strong>0.0005 ETH</strong>
          </p>
        </div>
      </div>
    </>
  );
}
