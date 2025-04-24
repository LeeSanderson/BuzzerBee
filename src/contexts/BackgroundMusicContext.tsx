import React, { createContext, useEffect, useRef, useState } from "react";

export interface BackgroundMusicContextProps {
  isPlaying: boolean;
  setIsPlaying: (boolean) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const BackgroundMusicContext = createContext<BackgroundMusicContextProps | undefined>(undefined);

export const BackgroundMusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(() => {
    const storedValue = localStorage.getItem("backgroundMusicEnabled");
    return storedValue !== null ? JSON.parse(storedValue) : true;
  });
  const [volume] = useState(0.3);
  const audioRef = useRef(new Audio("./audio/background-track.mp3"));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = volume;

    const startMusic = () => {
      setIsPlaying(true);
    };

    const playMusic = () => {
      if (isPlaying) {
        audio.play().catch((error) => {
          setIsPlaying(false);

          // Assume error due to audio being disabled because of no user interaction
          // Try to play again after user clicks or touches the screen
          document.removeEventListener("touchstart", startMusic);
          document.addEventListener("click", startMusic, { once: true });
          console.error("Error playing audio:", error);
        });
      } else {
        audio.pause();
      }
    };

    playMusic();

    return () => {
      document.removeEventListener("touchstart", startMusic);
      document.removeEventListener("click", startMusic);
      audio.pause();
    };
  }, [isPlaying, setIsPlaying, volume]);

  useEffect(() => {
    localStorage.setItem("backgroundMusicEnabled", JSON.stringify(isPlaying));
  }, [isPlaying]);

  return (
    <BackgroundMusicContext.Provider value={{ isPlaying, setIsPlaying }}>{children}</BackgroundMusicContext.Provider>
  );
};
