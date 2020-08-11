import React, {useContext} from 'react';
import {CurrentGameContext} from "../../contexts/currentGameContext";
import {Link} from "react-router-dom";

const RestartBtn = ({condition}) => {
  const [currentState, setCurrentState] = useContext(CurrentGameContext)
  const handlerRestart = () => {
    setCurrentState (state => ({
      ...state,
      win: false,
      counter: 0,
      restart: currentState.restart + 1
    }))
  }
  if (condition === 'Button') {
    return (
      <button
        className='btn btn-sm btn-outline-dark'
        onClick={(e) => handlerRestart()}
      >
        Restart
      </button>
    );
  } else {
    return (
      <Link
        className='btn btn-lg btn-outline-danger ml-2 px-5 mb-2'
        to='/puzzle'
        onClick={(e) => handlerRestart()}
      >
        Restart
      </Link>
    )
  }

};

export default RestartBtn;


