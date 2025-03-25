import { useContext } from "react";
import { BackgroundMusicContext, BackgroundMusicContextProps } from "../contexts/BackgroundMusicContext";

export const useBackgroundMusic = (): BackgroundMusicContextProps => {
  const context = useContext(BackgroundMusicContext);
  if (!context) {
    throw new Error("useBackgroundMusic must be used within a BackgroundMusicProvider");
  }
  return context;
};
