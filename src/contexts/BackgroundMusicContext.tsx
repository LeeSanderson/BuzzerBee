import React, { createContext, useEffect, useState } from "react";
import useSound from "use-sound";

export interface BackgroundMusicContextProps {
  isPlaying: boolean;
  setIsPlaying: (boolean) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const BackgroundMusicContext = createContext<BackgroundMusicContextProps | undefined>(undefined);

export const BackgroundMusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [play, { stop }] = useSound("/audio/background-track.mp3", {
    loop: true,
    volume: 0.5,
    onend: () => setIsPlaying(false),
  });

  useEffect(() => {
    const startMusic = () => {
      if (isPlaying) {
        try {
          play({ forceSoundEnabled: true });
        } catch (error) {
          console.error("Error playing sound:", error);
        }
      } else {
        stop();
      }
    };

    startMusic();
  }, [play, stop, isPlaying]);

  return (
    <BackgroundMusicContext.Provider value={{ isPlaying, setIsPlaying }}>{children}</BackgroundMusicContext.Provider>
  );
};
