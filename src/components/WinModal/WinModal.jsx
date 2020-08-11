import React, {Fragment, useCallback, useContext, useEffect, useRef, useState} from 'react';
import './index.scss'
import {Modal, Form, Button} from "react-bootstrap";
import {CurrentGameContext} from "../../contexts/currentGameContext";
import {Link} from "react-router-dom";
import axios from 'axios'

const WinModal = () => {
  const [currentState, setCurrentState] = useContext(CurrentGameContext)
  const [userData, setUserData] = useState({
    counter: 0,
    restart: 0,
    userName: '',
    id: 0
  })
  const name = useRef('')

  const setUserInfo = (e) => {
    setUserData (state => ({
      counter: currentState.counter,
      restart: currentState.restart,
      userName: name.current.value ? name.current.value : `Anonymous ${currentState.counter}`,
      id: Date.now()
    }))
    setCurrentState (state => ({
      ...state,
      win: false,
      counter: 0,
      restart: 0
    }))

  };
  const fetchUser = useCallback(() => {
    try {
      axios.post('https://fifteen-puzzle-830ef.firebaseio.com/users.json', userData)
    } catch(e) {
      console.log(e)
    }
  }, [userData])

  useEffect(() => {
    if(userData.id){
      fetchUser()
    }
  }, [userData.id, fetchUser])

  const closeModal = () => {
    setUserData(state => ({
      ...state,
      id: 0
    }))
  }

  return (
    <Fragment>
      <Modal
        show={currentState.win || !!userData.id}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header className='display-4'>
          Congratulations, You Won!!!
        </Modal.Header>
        <Form className='form'>
          <Form.Group>
            <Form.Label>
              Enter your name for rating.
            </Form.Label>
            {currentState.win
              ?
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  defaultValue={userData.userName && userData.userName}
                  ref={name}
                />
              :
                <Form.Control
                  type="text"
                  defaultValue={userData.userName}
                  readOnly
                />
            }
          </Form.Group>
          {currentState.win
            ?
              <Button
                variant='outline-dark'
                size='lg'
                onClick={(e) => setUserInfo(e)}
              >
                Submit
              </Button>
            :
              <Fragment>
                <Button
                  variant='outline-success'
                  size='lg'
                  onClick={(e) => closeModal(e)}
                >
                  Restart
                </Button>
                <Link
                  to='/rating'
                  className='btn btn-outline-secondary btn-lg ml-2'
                >
                  Rating
                </Link>
              </Fragment>
          }
        </Form>
      </Modal>
    </Fragment>
  );
}

export default WinModal;