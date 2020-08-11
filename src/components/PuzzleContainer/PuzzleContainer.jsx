import React, { useState, useEffect, useCallback, useContext } from 'react'
import './index.scss'
import {CurrentGameContext} from "../../contexts/currentGameContext";
import PuzzleItem from "../PuzzleItem/PuzzleItem"


const PuzzleContainer = () => {
  const [currentState, setCurrentState] = useContext(CurrentGameContext)
  const [numbers, setNumbers] = useState([])


  const mixingNumbers = (arr) => arr.sort(() => Math.random() - 0.5)

  useEffect(() => {
    setNumbers(mixingNumbers([...currentState.puzzleNumbers]))
  }, [currentState.puzzleNumbers, currentState.restart])


  const moveNumbers = useCallback((e, number) => {
    if (currentState.win) {
      return
    }
    const arr = [...numbers]

    const emptyIndex = arr.indexOf(16)
    const targetIndex = arr.indexOf(number)

    if(moveValidation(e)){
      arr.splice(emptyIndex, 1, number)
      arr.splice(targetIndex, 1, 16)
      setNumbers(arr)
      setCurrentState ((state) => ({
        ...state,
        counter: currentState.counter + 1
      }))
    }
  }, [numbers, currentState.counter, currentState.win, setCurrentState])

  const moveValidation = (e) => {
    const empty = document.querySelector('.clear'),
          eh = empty.offsetHeight,
          ew = empty.offsetWidth,
          el = empty.offsetLeft,
          et = empty.offsetTop,

          l = e.target.offsetLeft,
          t = e.target.offsetTop
    return (el + ew * 1.5 > l && el - ew * 1.5 < l && et === t) || (et + eh * 1.5 > t && et - eh * 1.5 < t && el === l)
  }

  useEffect(() => {
    if ((numbers.join('') === currentState.puzzleNumbers.join('') || numbers.join('') === '15913261014371115481216') && currentState.counter > 0) {
      setCurrentState (state => ({
        ...state,
        win: true
      }))
      console.log('win')
    }
  }, [numbers, currentState.counter, setCurrentState, currentState.puzzleNumbers])

  return (
    <div className='container d-flex justify-content-center mt-4'>
      <ul
        className='puzzle__container'
      >
        {numbers.map(number => (
          <PuzzleItem
            key={`${number}n`}
            number={number}
            move={e => moveNumbers(e, number)}
            valid={e => moveValidation(e)}
          />
        ))}
      </ul>
    </div>
  );
};

export default PuzzleContainer;