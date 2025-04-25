import React from "react";
import { useBackgroundMusic } from "../hooks/useBackgroundMusic";

const MuteButton: React.FC = () => {
  const { isPlaying, setIsPlaying } = useBackgroundMusic();
  return (
    <button
      onClick={() => {
        setIsPlaying(!isPlaying);
      }}
    >
      {isPlaying ? <i className="fas fa-volume-up"></i> : <i className="fas fa-volume-mute"></i>}
    </button>
  );
};

export default MuteButton;
