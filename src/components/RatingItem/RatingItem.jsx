import React from 'react';
import '../../pages/Rating/index.scss'

const RatingItem = ({name, steps, attempts, position}) => {
  return (
    <li className='rating-list-item'>
      <div className='rating-list-item__position'>
        {position}
      </div>
      <div className='rating-list-item__name'>
        {name}
      </div>
      <div className='rating-list-item__steps'>
        {steps}
      </div>
      <div className='rating-list-item__attempts'>
        {attempts}
      </div>
    </li>
  );
};

export default RatingItem;