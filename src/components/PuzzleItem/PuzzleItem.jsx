import React from 'react';
import './index.scss'

const PuzzleItem = ({number, move, valid, play}) => {
  return number === 16
    ? (<li className='puzzle__item clear'/>)
    : (
      <li
        className={`
                  puzzle__item 
                  ${valid ? 'moved' : ''}
                  ${play ? '' : 'disabled'}`
        }
        onClick={move}>
        {number}
      </li>
    )

};

export default PuzzleItem;