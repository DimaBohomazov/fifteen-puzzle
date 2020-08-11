import React, {Fragment, useContext} from 'react';
import './index.scss'
import {Link} from "react-router-dom";
import {CurrentGameContext} from "../../contexts/currentGameContext";
import RestartBtn from "../../components/RestartBtn/RestartBtn";

const Home = () => {
  const [currentState] = useContext(CurrentGameContext)
  return (
    <div className='container'>
      <h1 className='display-1 title'>
        Fifteen puzzle
      </h1>
      {currentState.counter === 0
        ?
        <Fragment>
          <p className='display-3 precept'>
            Are You Ready?
          </p>
          <Link
            className='btn btn-lg btn-outline-danger px-5'
            to='/puzzle'
          >
            Start
          </Link>
          <Link
            className='btn btn-lg btn-outline-secondary ml-2 px-5'
            to='/rating'
          >
            Rating
          </Link>
        </Fragment>
        :
        <Fragment>
          <p className='display-3 precept'>
            You will succeed!
          </p>
          <Link
            className='btn btn-lg btn-outline-success px-5 mb-2'
            to='/puzzle'
          >
            Continue
          </Link>
          <RestartBtn
            condition={'Link'}
          />
          <Link
            className='btn btn-lg btn-outline-secondary ml-2 px-5'
            to='/rating'
          >
            Rating
          </Link>
        </Fragment>
      }

    </div>
  );
};

export default Home;