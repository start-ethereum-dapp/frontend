import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

import { useAppContext } from "../../context/AppContext";
import { connectWallet, isWalletConnected } from "../../lib/ethereum";
import { AppContextInterface } from "../../context/AppContextTypes";

const WalletButton = () => {
  const { isLogin, setIsLogin, setCurrentAccount } =
    useAppContext() as AppContextInterface;
  const [isError, setIsError] = useState(false);

  const handleConnectWallet = async () => {
    const wallet = await connectWallet();

    if (wallet) {
      setIsLogin(true);
      setCurrentAccount(wallet);
      return;
    }

    setIsError(true);
  };

  const checkWalletConnection = async () => {
    const wallet = await isWalletConnected();
    if (wallet) {
      setCurrentAccount(wallet);
      setIsLogin(true);
    }
  };

  useEffect(() => {
    checkWalletConnection();
  }, [isLogin]);

  const Button = () => {
    if (isError) {
      return (
        <button
          className="h-10 flex font-bold items-center px-4 py-4 justify-center rounded-md border-2 border-white shadow-md bg-red-400 text-black"
          onClick={handleConnectWallet}
        >
          Error connecting wallet. Try again.
        </button>
      );
    }

    if (!isLogin) {
      return (
        <button
          className="h-10 flex font-bold items-center px-4 py-4 justify-center rounded-md border-2 border-white shadow-md bg-gray-900 text-white"
          onClick={handleConnectWallet}
        >
          Connect Wallet
        </button>
      );
    }
  };

  return (
    <>
      {isLogin ? (
        <div className="h-1 bg-green-300"></div>
      ) : (
        <div className="flex bg-red-300 dark:bg-red-200 flex-row-reverse p-1 border-gray-500">
          {Button()}
        </div>
      )}
    </>
  );
};

export default WalletButton;
