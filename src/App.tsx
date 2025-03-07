import React from "react";
import Game from "./Game";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Buzzer Bee Game</h1>
      </header>
      <Game />
    </div>
  );
};

export default App;
