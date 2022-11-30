import { BigNumber } from "ethers";
import { StarkToken } from "../../contracts/types/contracts/StarkToken";

export interface ContractProps {
  mintToken: (amount: number) => Promise<void>;
  currentAccount: string;
  walletConnected: boolean;
  balance: number;
}
