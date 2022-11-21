import { BigNumber } from "ethers";
import { StarkToken } from "../../contracts/types/contracts/StarkToken";

type WalletAddress = string;

export interface ContractProps {
  contractInst: StarkToken;
  currentAccount: WalletAddress;
  getBalance(): Promise<BigNumber | Error>;
}
