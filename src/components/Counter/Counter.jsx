import React, {useContext} from 'react';
import './index.scss'
import {CurrentGameContext} from "../../contexts/currentGameContext";

const Counter = () => {
  const [currentState] = useContext(CurrentGameContext)
  return (
    <div className='counter display-1'>
      Steps: {currentState.counter}
    </div>
  );
};

export default Counter;