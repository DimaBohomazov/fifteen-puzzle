import React, {createContext, useState} from 'react'

const puzzleNumbers = new Array(16).fill('').map((e,i) => e = i + 1)

export const CurrentGameContext = createContext([{}, p => {}])

export const CurrentGameProvider = ({children}) => {
  const [state, setState] = useState({
    win: false,
    counter: 0,
    restart: 0,
    puzzleNumbers,
  })
  return (
    <CurrentGameContext.Provider value={[state, setState]} >
      {children}
    </CurrentGameContext.Provider>
  )
}