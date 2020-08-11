import React from 'react';
import './index.scss'

const PuzzleItem = ({number, move, valid}) => {
  const cursorValid = e => valid(e) ? e.target.classList.add('moved') : e.target.classList.remove('moved')
  if (number === 16){
    return (
      <div className='puzzle__item clear' />
    )
  }
  return (
    <li
      className='puzzle__item'
      onClick={move}
      onMouseOver={e => cursorValid(e) }
    >
      {number}
    </li>
  );
};

export default PuzzleItem;