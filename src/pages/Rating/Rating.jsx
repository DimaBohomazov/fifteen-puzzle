import React, {useState, useEffect, Fragment} from 'react';
import './index.scss'
import axios from 'axios'
import RatingItem from "../../components/RatingItem/RatingItem";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";

const Rating = () => {
  const [userList, setUserList] = useState([])
  const getUsers = async () => {
    try {
      const response = await axios.get('https://fifteen-puzzle-830ef.firebaseio.com/users.json')
      const arr = []
      for (let key in response.data) {
        arr.push(response.data[key])
      }
      setUserList(arr)
    } catch(e) {
      console.log(e)
    }
  }

  const sortUsers = userList.sort((a, b) => a.counter - b.counter)

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <Fragment>
      <Header
        rating={true}
      />
      <div className='rating container display-3'>
        <h1 className='display-3 rating-title'>
          Leaderboard
        </h1>
        <ol className='user-list'>
          <li className='rating-list-item'>
            <div className='rating-list-item__position header-list'>
              №
            </div>
            <div className='rating-list-item__name header-list'>
              UserName
            </div>
            <div className='rating-list-item__steps header-list'>
              Steps
            </div>
            <div className='rating-list-item__attempts header-list'>
              Attempts
            </div>
          </li>
          {
            userList.length === 0
            ? <Loader />
            : sortUsers.map((e, index) => (
                  <RatingItem
                    key={e.id}
                    position={index + 1}
                    name={e.userName}
                    steps={e.counter}
                    attempts={e.restart}
                  />
                ))
          }

        </ol>
      </div>
    </Fragment>


  );
};

export default Rating;