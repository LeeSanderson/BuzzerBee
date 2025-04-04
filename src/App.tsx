import React from "react";
import Game from "./Game";
import "./App.css";
import { BackgroundMusicProvider } from "./contexts/BackgroundMusicContext";
import beeImage from "./assets/bee1.png";

const App: React.FC = () => {
  return (
    <BackgroundMusicProvider>
      <div className="App">
        <header className="App-header">
          <div className="bee-animation">
            <img src={beeImage} alt="Flying Bee" className="flying-bee" />
          </div>
        </header>
        <Game />
      </div>
    </BackgroundMusicProvider>
  );
};

export default App;
