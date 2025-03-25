import React from "react";
import Game from "./Game";
import "./App.css";
import { BackgroundMusicProvider } from "./contexts/BackgroundMusicContext";

const App: React.FC = () => {
  return (
    <BackgroundMusicProvider>
      <div className="App">
        <header className="App-header">
          <h1>Buzzer Bee Game</h1>
        </header>
        <Game />
      </div>
    </BackgroundMusicProvider>
  );
};

export default App;
