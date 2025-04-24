import React from "react";
import Game from "./Game";
import "./App.css";
import { BackgroundMusicProvider } from "./contexts/BackgroundMusicContext";

const App: React.FC = () => {
  return (
    <BackgroundMusicProvider>
      <div className="App">
        <header className="App-header"></header>
        <Game />
      </div>
    </BackgroundMusicProvider>
  );
};

export default App;
