import { createContext, useContext, useState } from 'react';

export const coinContext = createContext();

export function CoinContextProvider({ children }) {
  const [coinList, setCoinList] = useState();

  const [buyNumber, setBuyNumber] = useState();

  const value = {
    coinList,
    setCoinList,
    buyNumber,
    setBuyNumber,
  };

  return <coinContext.Provider value={value}>{children}</coinContext.Provider>;
}

export function useCoinContext() {
  return useContext(coinContext);
}
