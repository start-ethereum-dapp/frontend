import WalletAddress from "../Contract/WalletAddress";
import ToggleTheme from "./ToggleTheme";

const Header = () => {
  return (
    <header className="relative h-14 w-full bg-slate-200 dark:bg-slate-900 border-b-2 border-b-slate-400 dark:border-b-slate-100 p-2 flex text-right justify-between">
      <h1 className="font-bold my-auto text-2xl text-start">
        start-eth-dapp 🌠
      </h1>
      <div className="flex gap-10">
        <WalletAddress />
        <ToggleTheme />
      </div>
    </header>
  );
};

export default Header;
