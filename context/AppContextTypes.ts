import { SetStateAction } from "react";

export interface AppContextInterface {
  isLogin: boolean;
  setIsLogin: React.Dispatch<SetStateAction<boolean>>;
  currentAccount: string;
  setCurrentAccount: React.Dispatch<SetStateAction<string>>;
}
