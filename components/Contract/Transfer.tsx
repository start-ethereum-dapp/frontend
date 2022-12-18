import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Theme, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useContractContext, {
  ContractContext,
} from "../../hooks/ContractContext";

// ! todo: type
export default function Transfer({ transferToken }: any) {
  const [amount, setAmount] = useState(0);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const theme: Theme = window.localStorage.getItem("theme") as Theme;
  const [to, setTo] = useState("");
  const { walletConnected } = useContractContext() as ContractContext;

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

  const handleTransfer = async () => {
    try {
      setIsLoading(true);
      await transferToken(to, amount);
      setIsLoading(false);
      notifySuccess(`${amount} tokens transfer to ${to}`);
      setAmount(0);
      setTo("");
    } catch (error) {
      setIsError(true);
      notifyError("Transfer failed");
      setIsLoading(false);
      setAmount(0);
      setTo("");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className=" bg-slate-200 dark:bg-slate-800 py-5 px-3 rounded-md">
        <div className="flex flex-col gap-3 justify-between">
          <h2 className="my-auto text-xl">Transfer tokens</h2>
          <form className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="to">To:</label>
              <input
                type="text"
                name="to"
                id="to"
                className="my-2 border-2 rounded-md h-10 px-3 dark:border-black dark:bg-slate-100 dark:text-black"
                placeholder="0x0000000000000000000000000..."
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                name="amount"
                id="amount"
                className="my-2 border-2 rounded-md h-10 px-3 dark:border-black dark:bg-slate-100 dark:text-black"
                placeholder="1, 2, 3..."
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
              />
            </div>
            <button
              className="bg-gray-900 dark:bg-black text-white font-bold py-2 px-4 rounded h-10"
              type="submit"
              disabled={!walletConnected || isLoading}
              onClick={handleTransfer}
            >
              {!isLoading ? (
                "TRANSFER"
              ) : (
                <AiOutlineLoading3Quarters className="animate-spin m-auto" />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
