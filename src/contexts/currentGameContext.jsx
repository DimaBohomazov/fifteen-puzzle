import React, {createContext, useState} from 'react'

const puzzleNumbers = new Array(16).fill('').map((e,i) => e = i + 1)
const setCoordinates = () => {
  const arr = []
  for (let i = 1; i <= 4; i++) {
    for (let j = 1; j <= 4; j++) {
      arr.push({
        y: i,
        x: j
      })
    }
  }
  return arr
}
const puzzleCoordinates = setCoordinates()

export const CurrentGameContext = createContext([{}, p => {}])

export const CurrentGameProvider = ({children}) => {
  const [state, setState] = useState({
    win: false,
    counter: 0,
    restart: 0,
    puzzleCoordinates,
    puzzleNumbers,
    mixedPuzzleNumbers: []
  })
  return (
    <CurrentGameContext.Provider value={[state, setState]} >
      {children}
    </CurrentGameContext.Provider>
  )
}