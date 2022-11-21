import { useState } from "react";
import { ethers } from "ethers";
import { ContractProps } from "./Contract.d";

export default function Mint({
  contractInst,
  currentAccount,
  getBalance,
}: ContractProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const mint = async () => {
    try {
      console.log("Minting...");
      const tx = await contractInst.mint(currentAccount, 1, {
        value: ethers.utils.parseEther("0.0005"),
      });
      const result = await tx.wait();
      console.log("Minted");
      return result;
    } catch (error) {
      console.log("Failed to mint", error);
      setIsError(true);
    }
  };

  const handleMint = async () => {
    setIsLoading(true);
    const res = await mint();
    console.log(res);
    await getBalance();
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col bg-slate-800">
      <div>Mint</div>
      <div className="flex bg-blue-400 w-full">
        <button onClick={handleMint}>MINT</button>
      </div>
    </div>
  );
}
