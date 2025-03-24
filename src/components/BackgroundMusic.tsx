import React, { useEffect } from "react";
import useSound from "use-sound";

const BackgroundMusic: React.FC = () => {
  const [play, { stop }] = useSound("/audio/background-track.mp3", { loop: true, volume: 0.5 });

  useEffect(() => {
    const startMusic = () => {
      play();
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };

    window.addEventListener("click", startMusic);
    window.addEventListener("touchstart", startMusic);
    // startMusic(); - Uncomment this line to start music immediately

    return () => {
      stop();
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };
  }, [play, stop]);

  return null;
};

export default BackgroundMusic;
