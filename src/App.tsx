import React from "react";
import Game from "./Game";
import "./App.css";
import { BackgroundMusicProvider } from "./contexts/BackgroundMusicContext";

const App: React.FC = () => {
  return (
    <BackgroundMusicProvider>
      <div className="App">
        <header className="App-header">
          <a href="/" className="home" aria-label="Home" title="Back to SixSidedDice.com">
            <i className="fas fa-dice-five"></i>
            <span className="sr-only">Home</span>
          </a>
        </header>
        <Game />
      </div>
    </BackgroundMusicProvider>
  );
};

export default App;
