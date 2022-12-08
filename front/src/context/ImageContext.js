import { createContext, useContext, useState } from 'react';

export const ImageContext = createContext();

export function ImageContextProvider({ children }) {
  const [imageUrl, setImageUrl] = useState();

  const value = {
    imageUrl,
    setImageUrl,
  };

  return <ImageContext.Provider value={value}>{children}</ImageContext.Provider>;
}

export function useImageContext() {
  return useContext(ImageContext);
}
