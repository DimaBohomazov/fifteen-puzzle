import React, {useEffect, useContext, useCallback} from 'react'
import './index.scss'
import {CurrentGameContext} from "../../contexts/currentGameContext";
import PuzzleItem from "../PuzzleItem/PuzzleItem"


const PuzzleContainer = () => {
  const [currentState, setCurrentState] = useContext(CurrentGameContext)
  const {win, counter, restart, puzzleNumbers, mixedPuzzleNumbers, puzzleCoordinates} = currentState

  const spliceInArray = (array, number) => {
    const emptyIndex = array.indexOf(16)
    const numberIndex = array.indexOf(number)
    array.splice(emptyIndex, 1, number)
    array.splice(numberIndex, 1, 16)
  }

  const moveNumbers = (number) => {
    if (win){
      return
    }
    const arr = [...mixedPuzzleNumbers]
    if(moveValidation(number)){
      spliceInArray(arr, number)
      setCurrentState (state => ({
        ...state,
        counter: counter + 1,
        mixedPuzzleNumbers: arr
      }))
    }
  }

  const moveValidation = useCallback((number) => {
    const emptyIndex = mixedPuzzleNumbers.indexOf(16),
          numberIndex = mixedPuzzleNumbers.indexOf(number),
          emptyCoords = puzzleCoordinates[emptyIndex],
          numberCoords = puzzleCoordinates[numberIndex]
    const diff = (a, b) => {
      return Math.max(a,b) - Math.min(a,b) === 1
    }
    return (diff(emptyCoords.x, numberCoords.x) && emptyCoords.y === numberCoords.y) ||
           (diff(emptyCoords.y, numberCoords.y) && emptyCoords.x === numberCoords.x)
  }, [mixedPuzzleNumbers, puzzleCoordinates])


  const mixingNumbers = useCallback(() => {
    const arr = mixedPuzzleNumbers
    const mixing = () => {
      const valid = arr.filter(e => moveValidation(e))
      const randomValidNumber = valid[Math.floor(Math.random() * valid.length)]
      spliceInArray(arr, randomValidNumber)
      setCurrentState(state => ({
        ...state,
        mixedPuzzleNumbers: arr
      }))
    }
    for (let i = 0; i < 100; i++) {
      setTimeout(() => {
        mixing()
      }, 20 * i)
    }
  },[mixedPuzzleNumbers, moveValidation, setCurrentState])

  const winnerValidation = useCallback(() => {
    const currentCombination = mixedPuzzleNumbers.join('')
    const firstWonCombination = puzzleNumbers.join('')
    let secondWonCombination = ''
    for (let i = 1; i <= 4; i++) {
      for (let j = 0; j <= 12; j += 4 ) {
        let sum = i + j
        secondWonCombination += sum
      }
    }
    return (currentCombination === (firstWonCombination || secondWonCombination)) && counter > 0
  }, [counter, mixedPuzzleNumbers, puzzleNumbers])

  useEffect(() => {
    if (winnerValidation()) {
      setCurrentState (state => ({
        ...state,
        win: true
      }))
      console.log('win')
    }
  }, [setCurrentState, winnerValidation])

  useEffect(() => {
      if(!counter) {
        mixingNumbers()
      }
  }, [counter, restart, mixingNumbers])

  return (
    <div className='container d-flex justify-content-center mt-4 position-relative'>
      <ul
        className='puzzle__container'
      >
        {mixedPuzzleNumbers.map(number => (
          <PuzzleItem
            key={`${number}n`}
            number={number}
            move={()=>moveNumbers(number)}
            valid={moveValidation(number)}
          />
        ))}
      </ul>
    </div>
  );
};

export default PuzzleContainer;