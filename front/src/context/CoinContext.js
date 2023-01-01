import { createContext, useContext, useState } from 'react';

export const coinContext = createContext();

export function CoinContextProvider({ children }) {
  const [coinList, setCoinList] = useState();

  const [buyNumber, setBuyNumber] = useState();

  const [sellNumber, setSellNumber] = useState();

  const value = {
    coinList,
    setCoinList,
    buyNumber,
    setBuyNumber,
    sellNumber,
    setSellNumber,
  };

  return <coinContext.Provider value={value}>{children}</coinContext.Provider>;
}

export function useCoinContext() {
  return useContext(coinContext);
}
