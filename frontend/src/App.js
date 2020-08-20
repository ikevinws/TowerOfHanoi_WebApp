import React from "react";
import "./styles/styles.scss";
import Game from "./components/game";
import Navbar from "./components/navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Game />
    </>
  )
}

export default App;
