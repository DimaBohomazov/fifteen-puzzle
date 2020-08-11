import React from 'react';
import Header from "../../components/Header/Header";
import PuzzleContainer from "../../components/PuzzleContainer/PuzzleContainer";
import WinModal from "../../components/WinModal/WinModal";

const Puzzle = () => {
  return (
    <div>
      <Header />
      <PuzzleContainer />
      <WinModal />
    </div>
  );
};

export default Puzzle;