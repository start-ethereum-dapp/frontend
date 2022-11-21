import React, { useContext, createContext } from "react";
import { AppContextInterface } from "./AppContextTypes";

//Context
export const AppContext = createContext<AppContextInterface | null>(null);

//Provider
export const AppContextProvider = ({ children }: any) => {
  const [isLogin, setIsLogin] = React.useState(false);
  const [currentAccount, setCurrentAccount] = React.useState("");

  //ComponentDidMount
  React.useEffect(() => {}, []);

  //
  const values: AppContextInterface = React.useMemo(
    () => ({
      isLogin,
      setIsLogin,
      currentAccount,
      setCurrentAccount,
    }),
    [isLogin, setIsLogin, currentAccount, setCurrentAccount]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

//
export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    console.error("Error deploying App Context.");
  }

  return context;
}

export default useAppContext;
