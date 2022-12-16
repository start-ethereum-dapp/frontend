import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiCircleAlert } from "react-icons/ci";

import { ContractProps } from "./Contract.d";
import { Theme, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Mint({
  mintToken,
  walletConnected,
  balance,
}: ContractProps) {
  const theme: Theme = window.localStorage.getItem("theme") as Theme;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleMint = async () => {
    try {
      setIsLoading(true);
      await mintToken(1);
      setIsLoading(false);
      setIsSuccess(true);
      notifySuccess("Minted!");
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      notifyError("Error minting");
    }
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
            disabled={!walletConnected || balance === 10}
          >
            {!isLoading ? (
              "MINT"
            ) : (
              <AiOutlineLoading3Quarters className="animate-spin" />
            )}
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-5 text-sm text-slate-700 dark:text-slate-400">
          <div className="flex gap-3 text-red-500">
            <CiCircleAlert className="my-auto" />
            <p>
              <strong>You can mint 10 tokens max.</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
