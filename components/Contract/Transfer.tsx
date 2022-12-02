import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiCircleAlert } from "react-icons/ci";

import { ContractProps } from "./Contract.d";
import { Theme, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useContractContext, { ContractContext } from "../../hooks/Contract";
// ! todo

export default function Transfer() {
  const theme: Theme = window.localStorage.getItem("theme") as Theme;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { walletConnected } = useContractContext() as ContractContext;
  //   const notifyError = (message: string) =>
  //     toast.error(message, {
  //       position: toast.POSITION.TOP_CENTER,
  //       autoClose: 3000,
  //       toastId: "error",
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: theme,
  //     });

  //   const notifySuccess = (message: string) => {
  //     toast.success(message, {
  //       position: toast.POSITION.TOP_CENTER,
  //       autoClose: 3000,
  //       toastId: "success",
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: theme,
  //     });
  //   };

  return (
    <>
      <ToastContainer />
      <div className=" bg-slate-200 dark:bg-slate-800 py-5 px-3 rounded-md">
        <div className="flex flex-col gap-3 justify-between">
          <h2 className="my-auto text-xl">Transfer tokens</h2>
          <form className="flex flex-col">
            <label>To:</label>
            <input
              type="text"
              name=""
              id=""
              className="my-2 border-2 rounded-md h-10 px-3 dark:border-black dark:bg-slate-100 dark:text-black"
            />
            <button
              className="bg-gray-900 dark:bg-black text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={!walletConnected || isLoading}
            >
              {!isLoading ? (
                "TRANSFER"
              ) : (
                <AiOutlineLoading3Quarters className="animate-spin" />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
