import React, {Fragment} from 'react';
import Counter from "../Counter/Counter";
import {Link} from "react-router-dom";
import RestartBtn from "../RestartBtn/RestartBtn";

const Header = ({rating}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light justify-content-between">
      <div className='container'>
        <Link
          className="navbar-brand"
          to='/'
        >
          Fifteen Puzzle
        </Link>
        {
          rating
          ?
            <Link
              className='btn btn-outline-secondary'
              to='/'
            >
              Home
            </Link>
          :
            <Fragment>
              <Counter />
              <RestartBtn
                condition={'Button'}
              />
            </Fragment>
        }

      </div>
    </nav>
  );
};

export default Header;